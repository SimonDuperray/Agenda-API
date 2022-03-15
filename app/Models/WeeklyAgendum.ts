import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class WeeklyAgendum extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public student_id: number;

  @column()
  public agenda_obj: Object;

  @column()
  public steps_repartition: Object;

  @column()
  public nb_hour_per_lesson: Object;

  @column()
  public teachers_repartition: Object;

  @column()
  public nb_hours: number;

  @column()
  public nb_exams: number;
}
