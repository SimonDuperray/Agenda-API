import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddBuildingRepartitions extends BaseSchema {
  protected tableName = 'weekly_agendas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('building_repartitions')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('building_repartitions')
    })
  }
}
