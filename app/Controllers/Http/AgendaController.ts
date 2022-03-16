import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentInterface from 'App/Models/StudentInterface';
import axios from 'axios'

export default class AgendaController {

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

   async index ({ params }: HttpContextContract) {
      const id = params.id;
      const date: Date = new Date();
      
      const data: Object = await this.getWeeklyAgenda(id, date)

      return data
   }

   async getStudents () {
      return {
         "students": this.students
      }
   }

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

}
