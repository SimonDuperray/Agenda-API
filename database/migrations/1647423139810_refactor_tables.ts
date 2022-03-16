import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WeeklyAgendas extends BaseSchema {
  protected tableName = 'weekly_agenda'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('student_id').unsigned().notNullable()
      table.string('agenda_obj', 2000).notNullable()
      table.string('steps_repartition', 2000).notNullable()
      table.string('nb_hour_per_lesson', 2000).notNullable()
      table.string('teachers_repartition', 2000).notNullable()
      table.string('lessons_types_repartition', 2000).notNullable()
      table.integer('nb_hours').notNullable()
      table.integer('nb_exams').notNullable()
      table.string('buildings_repartition', 2000).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}