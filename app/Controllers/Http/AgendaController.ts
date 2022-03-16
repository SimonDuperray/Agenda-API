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

      // get current datetime
      const date: Date = new Date();
      const day: number = date.getDay();
      const isWeekend: boolean = day === 0 || day === 6 ? true : false;
      const fullDate: string = date.getDate()+"/"+(date.getMonth() + 1).toString()+"/"+date.getFullYear();
      if(day==0 || day==6) {

      }

      // send request
      const url = "https://reverse-proxy.eseo.fr/API-SP/API/agenda/user/20220316T050000/20220316T210000/" + id;
      const res = await axios.get(url);
      const agenda = res.data;
      
      return {
         "res": agenda,
         "date": fullDate,
         "isWeekend": isWeekend
      }
   }

   async get_students () {
      return {
         "students": this.students
      }
   }
}
