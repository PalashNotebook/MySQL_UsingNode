const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
connection.connect((error)=>{
    if(error) throw error;
    else console.log('database connected');

   
})

app.post('/query', (req, res)=>{
    console.log(req.body.customerName);
    res.send("Done");
    runQuery(req.body.customerName);
})

function runQuery(name)
{
    connection.query(`SELECT contactLastName from customers WHERE customerName=?`, [name], (error, results) =>{
        if(error) throw error;
        console.log(results[0].contactLastName);
    })
}


app.listen(3030, (error)=>{
    if(error) console.log(error);
    else console.log('connected');
})