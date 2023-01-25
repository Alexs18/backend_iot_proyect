module.exports = {
    registersensor(sensor){
        let {elementoquimico, descripcion, imagen} = sensor;
        return `insert into sparksiot.sensors (elemento_quimico, descripcion, estado, img)
        values ('${elementoquimico}', '${descripcion}','true' ,'img')
        RETURNING id`
    },
    lissensors(){
        return `select * from sparksiot.sensors`
    },
    shearbyname(elementoquimico){
        return `select * from sparksiot.sensors
            where elemento_quimico = '${elementoquimico}'`        
    }

}