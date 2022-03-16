import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WeeklyAgendas extends BaseSchema {
  protected tableName = 'weekly_agenda'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().notNullable()
      table.json('agenda_obj').notNullable()
      table.json('steps_repartition').notNullable()
      table.json('nb_hour_per_lesson').notNullable()
      table.json('teachers_repartition').notNullable()
      table.json('lessons_types_repartition').notNullable()
      table.integer('nb_hours').notNullable()
      table.integer('nb_exams').notNullable()
      table.json('buildings_repartition').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}