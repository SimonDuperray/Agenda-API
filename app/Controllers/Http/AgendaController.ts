import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class AgendaController {
   async index ({ params }: HttpContextContract) {
      const id = params.id;
      const url = "https://reverse-proxy.eseo.fr/API-SP/API/agenda/user/20220315T050000/20220315T210000/" + id;
      const res = await axios.get(url);
      const agenda = res.data;
      return {
         "res": agenda
      }
   }
}
