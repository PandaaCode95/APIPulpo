
const mysql = require("mysql2");

const connection = mysql.createConnection(
{
    host        :"localhost",
    user        :"root",
    password    :"albatros33",
    database    :"pulpo"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión establecida")
    }
});

module.exports = connection;

