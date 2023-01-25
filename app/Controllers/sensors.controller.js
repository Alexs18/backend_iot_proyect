const Pool = require("../Database");
const { registersensor, shearbyname, lissensors } = require("../Database/querys/sensors");

class Sensors{

    async RegisterSensors(req, res){
        let {sensor} = req.body;
        let querybyname = shearbyname(sensor.elemento.quimico);
        let foundEQ = await Pool.query(querybyname);
        try {
            if (foundEQ.rows.length >0) {
                return res.status(303)
                    .json(
                        {
                            message:'Ya se encuentra un sensor asociado a este elemento quimico',
                            icon:'warning'
                        }
                    )
            }
            let queryregister = registersensor(sensor);
            let {rows} = await Pool.query(queryregister);
            if (rows.length <=0) {
                return res.status(400)
                .json(
                    {
                        message:'No se logró crear el sensor correctamente',
                        icon:'warning',
                        text:'Bad request'
                    }
                )         
            }        
            return res.status(200)
            .json(
                {
                    message:'Sensor creado correctamente',
                    icon:'success'
                }
            ) 
        } catch (error) {
            return res.status(500)
            .json(
                {
                    message:'Ocurrió un error, contacte con sistemas',
                    icon:'error'
                }
            ) 
        }
       
    }

    async ListaSensors(req, res){
        try {
            let sensorsquery = lissensors();
            let listSensors = await Pool.query(sensorsquery);
            return res.status(200)
                   .json({
                        listasensor: listSensors.rows[0],
                        cantidadsensors:listSensors.rowCount
                   })
        } catch (error) {
            return res.status(500)
                   .json({
                        listasensor:[],
                        message:'Ocurrió un error, contacte con sistemas'
                   })
        }
    }

}

let InstanciaSensors = new Sensors();
module.exports = InstanciaSensors;