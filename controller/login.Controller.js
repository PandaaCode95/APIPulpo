const { response, request } = require("express");
const connection = require("../database");


function getLogin(request,response){
        let sql;
        
        let param = [request.body.nick, request.body.password];
        console.log(param)
        console.log("Entramos a la funcion getLogin en el back");
        sql = "SELECT * FROM user WHERE nick =? AND password =?";
        connection.query(sql, param, function (err, result) {
        if (err) {
            console.log(err);
            answer = {
            err: true,
            codigo: 500,
            mensaje: "Usuario no encontrado",
            titulo: "Error busqueda",
            result: "usuario no valido",
            };
        } else {
            if (result.length > 0) {
                console.log(result)
            
            answer = {
                error: false,
                codigo: 500,
                mensaje: "Usuario encontrado",
                titulo: "Usuario Encontrado",
                result: result,
            };
           
            console.log("el result devuelto por la query es: ");
            console.log(result);
            } else {
            answer = {
                err: true,
                codigo: 500,
                mensaje: "Usuario no encontrado",
                titulo: "Error busqueda",
                result: "usuario no valido",
            };
            }
        }
         response.send(answer);}
        );

}
module.exports = {getLogin}