import knex from "knex";

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'data.db'
    }
})

await db.schema.createTableIfNotExists('users', (table) => {
    table.increments('id')
    table.string('user_name')
    table.integer('age')
    table.timestamps(true, true)
})

const insertedRows = await db('users').insert({
    user_name: 'hwz',
    age: 30
})
console.log(insertedRows)

const users = await db('users').select()
console.log(users)
