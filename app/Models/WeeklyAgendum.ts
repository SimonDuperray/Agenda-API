import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class WeeklyAgendum extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public student_id: number;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    // consume: (value: string) => JSON.parse(value),
  })
  public agenda_obj: string;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    // consume: (value: string) => JSON.parse(value),
  })
  public steps_repartition: string;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    // consume: (value: string) => JSON.parse(value),
  })
  public nb_hour_per_lesson: string;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    // consume: (value: string) => JSON.parse(value),
  })
  public teachers_repartition: string;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    // consume: (value: string) => JSON.parse(value),
  })
  public lessons_types_repartition: string;

  @column()
  public nb_hours: number;

  @column()
  public nb_exams: number;

  @column({
    prepare: (value: Object) => JSON.stringify(value),
    // consume: (value: string) => JSON.parse(value),
  })
  public buildings_repartition: string;
}
