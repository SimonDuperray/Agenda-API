import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentInterface from 'App/Models/StudentInterface';
import axios from 'axios'
import Agenda from 'App/Models/Agenda';
import Database from '@ioc:Adonis/Lucid/Database';

export default class AgendaController {

   // PRIVATE ATTRIBUTES

   private students: Array<StudentInterface> = [
      {
         student_id: 41857,
         fname: "Simon",
         lname: "Duperray"
      }, {
         student_id: 43493,
         fname: "Alexandre",
         lname: "Halopé"
      }, {
         student_id: 44152,
         fname: "Marcelin",
         lname: "Liehn"
      }, {
         student_id: 46325,
         fname: "Flavie",
         lname: "Magne"
      }, {
         student_id: 43156,
         fname: "Léopold",
         lname: "Denis"
      }
   ];

   // CONTROLLER METHODS

   async index ({ params }: HttpContextContract) {
      const weeklyAgendum: Object = await Agenda.findByOrFail('student_id', params.id);
      return weeklyAgendum;
   }

   async getStudents () {
      return {
         "students": this.students
      }
   }

   async storeAll () {
      await Database
         .from('weekly_agenda')
         .delete()
      await this.students.forEach(student => {
         this.store(student.student_id);
      });
      return {
         "success": "ok"
      }
   }

   // PRIVATE METHODS

   private async getWeeklyAgenda ( id: number, d: Date ) {
      const day: number = d.getDay();
      const isWeekend: boolean = day === 0 || day === 6 ? true : false;
      const fullDate: string = d.getDate()+"/"+(d.getMonth() + 1).toString()+"/"+d.getFullYear();

      // get week range
      const week: Object = isWeekend ? await this.getNextWeek(d) : await this.getCurrentWeek(d);

      // format date to pass it in the request
      const mondayMonth = week['monday'].getMonth()+1<10 ? "0"+(week['monday'].getMonth()+1).toString() : (week['monday'].getMonth()+1).toString();
      const fridayMonth = week['friday'].getMonth()+1<10 ? "0"+(week['friday'].getMonth()+1).toString() : (week['friday'].getMonth()+1).toString();
      const monday: string = week['monday'].getFullYear()+mondayMonth+week['monday'].getDate()
      const friday: string = week['friday'].getFullYear()+fridayMonth+week['friday'].getDate()

      // send request
      const url = "https://reverse-proxy.eseo.fr/API-SP/API/agenda/user/"+monday+"T050000/"+friday+"T210000/"+id;
      const res = await axios.get(url);
      const agenda = res.data;

      return {
         "res": agenda,
         "date": fullDate,
         "isWeekend": isWeekend,
         "week": week,
      }
   }

   private async getNextWeek(d: Date) {
      const nextMonday: Date = new Date();
      nextMonday.setDate(d.getDate()+(((1+7-d.getDay())%7) || 7));

      const nextFriday = new Date(d.setDate(nextMonday.getDate() - nextMonday.getDay() + 5));

      return {
         'monday': nextMonday,
         'friday': nextFriday
      }
   }

   private async getCurrentWeek(d: Date) {
      const monday: Date = new Date(d.setDate(d.getDate()-d.getDay()+1));
      const friday: Date = new Date(d.setDate(d.getDate()-d.getDay()+5));
      return {
         'monday': monday,
         'friday': friday
      }
   }

   private async getStepsRepartition ( agendas: Array<Object> ) {
      // TODO: get building repartition
      const steps: Object = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0};
      agendas.forEach(agenda => {
         const place: string = agenda['Emplacement'];
         if(place.includes('-')) {
            const stage: string = place.substring(1,2)
            steps[stage]+=1
         }
      });
      return steps;
   }

   private async getBuildingRepartition ( agendas: Array<Object> ) {
      // TODO: get building repartition
      const buildings: Object = {'A': 0, 'B': 0, 'C': 0, 'D': 0};
      agendas.forEach(agenda => {
         const place: string = agenda['Emplacement'];
         if(place.includes('-')) {
            const stage: string = place.substring(0,1)
            buildings[stage]+=1
         }
      });
      return buildings;
   }

   private async getNbHourPerLesson ( agendas: Array<Object> ) {
      const lessons: Object = {};
      agendas.forEach(agenda => {
         // get libelle
         const libelle: string = agenda['Libelle'];
         // get course duration
         const lessonDuration = Number(((new Date(agenda['Fin']).getTime()-new Date(agenda['Debut']).getTime())/36e5).toFixed(2));
         // insert duration in lessons object
         if(!Object.keys(lessons).includes(libelle)) {
            lessons[libelle] = lessonDuration;
         } else {
            lessons[libelle] += lessonDuration
         }
      });
      return lessons;
   }

   private async getTeachersRepartition ( agendas: Array<Object> ) {
      const teachers: Object = {};
      agendas.forEach(agenda => {
         // get teacher
         const teacher: string = agenda['Professeur'];
         // get course duration
         const lessonDuration = Number(((new Date(agenda['Fin']).getTime()-new Date(agenda['Debut']).getTime())/36e5).toFixed(2));
         // insert duration in lessons object
         if(agenda['Code']!='EXA') {
            if(!Object.keys(teachers).includes(teacher)) {
               teachers[teacher] = lessonDuration;
            } else {
               teachers[teacher] += lessonDuration
            }
         }
      });
      return teachers;
   }

   private async getLessonsTypeRepartition ( agendas: Array<Object>) {
      const lessonsTypes: Object = {};
      agendas.forEach(agenda => {
         // get teacher
         const code: string = agenda['Code'];
         // get course duration
         const lessonDuration = Number(((new Date(agenda['Fin']).getTime()-new Date(agenda['Debut']).getTime())/36e5).toFixed(2));
         // insert duration in lessons object
         if(!Object.keys(lessonsTypes).includes(code)) {
            lessonsTypes[code] = lessonDuration;
         } else {
            lessonsTypes[code] += lessonDuration
         }
      });
      return lessonsTypes;
   }

   private async getExamCode ( agendas: Array<Object> ) {
      var exams: number = 0;
      agendas.forEach(agenda => {
         // get teacher
         const code: string = agenda['Code'];
         if(code.includes('EXA')) {
            exams+=1;
         }
      });
      return exams;
   }

   private async store ( std_id: number ) {
      const date: Date = new Date();
      
      const data: Object = await this.getWeeklyAgenda(std_id, date);
      const agendaObj: Object = data['res'];
      const stepsRepartition: Object = await this.getStepsRepartition(data['res']);
      const nbHourPerLesson: Object = await this.getNbHourPerLesson(data['res']);
      const teachersRepartition: Object = await this.getTeachersRepartition(data['res']);
      const lessonsTypeRepartition: Object = await this.getLessonsTypeRepartition(data['res']);
      const totalHours: number = Object.values(lessonsTypeRepartition).reduce((a,b) => a+b, 0);
      const exams: number = await this.getExamCode(data['res']);
      const buildingRepartition: Object = await this.getBuildingRepartition(data['res']);

      const agenda = new Agenda();

      const toStore: Object = {
         "student_id": std_id,
         "agenda_obj": agendaObj,
         "steps_repartition": stepsRepartition,
         "nb_hour_per_lesson": nbHourPerLesson,
         "teachers_repartition": teachersRepartition,
         "lessons_types_repartition": lessonsTypeRepartition,
         "nb_hours": totalHours,
         "nb_exams": exams,
         "buildings_repartition": buildingRepartition,
      }

      await agenda.merge(toStore).save();
   }

}
