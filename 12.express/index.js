const express = require('express')
const sql = require('mssql')

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/user/:id',async (req,res)=>{
    const id = req.params.id
    console.info('id:', id)
    const pool = await sql.connect('Server=10.108.1.153,1431;Database=test_njfs;User Id=his;Password=His5200;TrustServerCertificate=true')
    let result
    if(id === '-1'){
        result = await pool.query`select * from sys_users`
    } else {
        result = await pool.query`select [UserID],[LoginCode],[Name] from sys_users where userid = ${id}`
    }
    res.json(result.recordset)
})

app.listen(3000)