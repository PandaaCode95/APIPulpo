const { response, request } = require("express");
const connection = require("../database");

//Get Vehicle

function getVehicle(request,response){
    let sql;
    if(!request.query.id_vehicle){
        console.log("entro")
        sql = "SELECT * FROM vehicles;"
        connection.query(sql,function(err,result){
            if(err){
                console.log(err);
            }else{
                response.send(result);
                console.log(result)

            }
        })
    }else{
         console.log("entro");
         sql = "SELECT * FROM vehicles WHERE id_vehicle ="+request.query.id_vehicle;
         connection.query(sql, function (err, result) {
           if (err) {
             console.log(err);
           } else {
             response.send(result);
             console.log(result);
           }
         });
    }

}

function getVehiclesFilter(request, response) {
        console.log("______________________________________________________________________________________________________________________________")
    

                let brand = request.body.brand;
                let brandf = "brand = " + "'" + request.body.brand + "'";
                let model = request.body.model;
                let modelf = "model = " + "'" + request.body.model + "'";
                let year = request.body.year;
                let yearf = "year   = " + "'" + request.body.year + "'";
                let color = request.body.color;
                let colorf = "color = " + "'" + request.body.color + "'";
                let entry_date = request.body.entry_date;
                let entry_datef ="color = " + "'" + request.body.entry_date + "'";
                let status = request.body.status;
                let statusf = "status = " + "'" + request.body.status + "'";
    
                let filter = [brand,brandf,model,modelf,year  ,yearf,color,colorf,entry_date,entry_datef,status,statusf]
    
                let sql = "SELECT * FROM vehicles " 

                let control = 1;
                console.log(filter)
                for(let i=0; i<filter.length; i+=2) {
                    console.log("Entro en bucle")
                    console.log(filter[i])
                    if (control>1 && filter[i] != undefined && filter[i] != "" && filter[i] != null ) {
                        sql += " AND " + filter[i+1]
                       
                    } else if (filter[i] != undefined && filter[i] != "" && filter[i] != null){
                        sql += "WHERE " + filter[i+1];
                        control++;
                    }
                }
                console.log("La query dinamica es: ")
                console.log(sql);
            
                connection.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.send(result);
                    }
                })
    

           
        }

function postVehicle(request, response) {

    let sql = "INSERT INTO vehicles(brand, model, year, color, entry_date, status)" 
    + "VALUES ('" + request.body.brand + "','" + request.body.model + "','" + request.body.year + "','" + request.body.color + "','" + request.body.entry_date + "','" + request.body.status+"')";
    console.log(sql)

    connection.query(sql, function (err, result) {

        if (err) {
            console.log(err);
        } else {
            console.log(result);
            console.log("Vehiculo insertado con exito");
            if (result.insertId)
                response.send(result)
            else
                response.send(result)
        }
    })
}

function putVehicle(request, response) {
    {
        
        console.log(request.body.id_vehicle + "el id de vehicle en el back")
        if(request.query.id_vehicle != ""){
        let params = [
          request.query.id_vehicle,
          request.body.brand,
          request.body.model,
          request.body.year,
          request.body.color,
          request.body.entry_date,
          request.body.status,
        ];
    
        let sql = "UPDATE vehicles SET id_vehicle = COALESCE(?, id_vehicle) , " + 
                   "brand = COALESCE(?, brand), " + "model = COALESCE(?, model), " + "year = COALESCE(?, year), " +
                   "color = COALESCE(?, color), " + "entry_date = COALESCE(?, entry_date),"+"status = COALESCE(?, status) " + " WHERE id_vehicle= " + request.query.id_vehicle;

        console.log(sql); 
        connection.query(sql, params,function (err, result) 
        {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                if (result.insertId)
                    response.send(String(result.insertId))
                else
                    response.send(result)
            }
        }); 
    }else{
        console.log("Introduce un id válido")
    }
}
}

function deleteVehicle(request, response) {
    
    let sql;
console.log(request.query.id_vehicle + "ESTA ES LA ID")    
    sql = "DELETE FROM vehicles WHERE id_vehicle=" +  request.query.id_vehicle   
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if (result.insertId)
                response.send(result)
            else
                response.send(result)
        }
        
    })
}




module.exports = {getVehicle, postVehicle, putVehicle, deleteVehicle, getVehiclesFilter}