import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentInterface from 'App/Models/StudentInterface';
import axios from 'axios'

export default class AgendaController {

   private students: Array<StudentInterface> = [
      {
         student_id: 41857,
         fname: "Simon",
         lname: "Duperray"
      }
   ];

   async index ({ params }: HttpContextContract) {
      const id = params.id;
      const url = "https://reverse-proxy.eseo.fr/API-SP/API/agenda/user/20220315T050000/20220315T210000/" + id;
      const res = await axios.get(url);
      const agenda = res.data;
      
      return {
         "res": agenda,
         "students": this.students
      }
   }
}
