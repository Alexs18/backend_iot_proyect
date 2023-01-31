module.exports = {
    editUser(user){
        let {nombre, apellido, correo, telefono, id} = user;
        return `insert into sparksiot.sensors (elemento_quimico, descripcion, estado, img)
        values ('${elementoquimico}', '${descripcion}','true' ,'img')
        RETURNING id`
    },
    lissensors(){
        return `select * from sparksiot.sensors where estado = true`
    },
    eliminacionlogica(id){
        return `update sparksiot.sensors set estado = false where id = '${id}'
            RETURNING id`
    },
    shearbyname(elementoquimico){
        return `select * from sparksiot.sensors
            where elemento_quimico = '${elementoquimico}'`        
    },
    updatesensor(sensor, id){
        let {elementoquimico, descripcion, imagen} = sensor;
        return `update sparksiot.sensors set descripcion = '${descripcion}',
                    elemento_quimico = '${elementoquimico}'
                where id = ${id}
                RETURNING id;`
    }

}