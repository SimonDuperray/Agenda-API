import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class WeeklyAgendum extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public student_id: number;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public agenda_obj: Object;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public steps_repartition: Object;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public nb_hour_per_lesson: Object;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public teachers_repartition: Object;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public lessons_types_repartition: Object;

  @column()
  public nb_hours: number;

  @column()
  public nb_exams: number;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  public buildings_repartition: Object;
}
