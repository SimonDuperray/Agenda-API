import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class WeeklyAgendum extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public student_id: number;

  @column()
  public agenda_obj: string;

  @column()
  public steps_repartition: string;

  @column()
  public nb_hour_per_lesson: string;

  @column()
  public teachers_repartition: string;

  @column()
  public lessons_types_repartition: string;

  @column()
  public nb_hours: number;

  @column()
  public nb_exams: number;

  @column()
  public buildings_repartition: string;
}
