let {Pool} = require('../Database/index');
const moment = require('moment');

class Migracion{

    async insertdatasensors(req, res){

       const selectsensors = 'SELECT id, elemento_quimico  FROM sparksiot.sensors where estado = true'
       const sensorsregisters =  await Pool.query(selectsensors);
       const queryextraer = `select * from sparksiot.uleamsensors ORDER BY id DESC LIMIT 1000;`;
       const dataextra = await Pool.query(queryextraer);

       for await (const sensor of sensorsregisters.rows) {
            console.log('pasa primer for');
            
            for await (const data of dataextra.rows) {
        
                let fecha = data.basetimestamp;
                let fechaObj = new Date(`${fecha}`);
                const anio = fechaObj.getFullYear();
                const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
                const dia = String(fechaObj.getDate()).padStart(2, '0');
                const hora = String(fechaObj.getHours()).padStart(2, '0');
                const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
                const segundos = String(fechaObj.getSeconds()).padStart(2, '0');
        
                // Construir la cadena en formato ISO 8601
                const fechaISO = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
                console.log(fechaISO);
      
            if (sensor.elemento_quimico === 'tem') {
                
                const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
                values ('${fechaISO}', '${sensor.id}', ${data.tem}) returning id `;
                const {rows} = await Pool.query(insertatemp);
                console.log('INGRESANDO DATOS TEM');
                
                
            }
            // if (sensor.elemento_quimico === 'hum') {
                
            //     const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
            //     values ('${fechaISO}', '${sensor.id}', ${data.hum}) returning id `
            //     const {rows} = await Pool.query(insertatemp);
            //     console.log('INGRESANDO DATOS HUM');

            // }
            // if (sensor.elemento_quimico === 'pm1') {
                
            //     const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
            //     values ('${fechaISO}', '${sensor.id}', ${data.pm1}) returning id `
            //     const {rows} = await Pool.query(insertatemp);
            //     console.log('INGRESANDO DATOS pm1');

            // }
            // if (sensor.elemento_quimico === 'pm25') {
                
            //     const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
            //     values ('${fechaISO}', '${sensor.id}', ${data.pm25}) returning id `
            //     const {rows} = await Pool.query(insertatemp);
            //     console.log('INGRESANDO DATOS pm25');

            // }
            // if (sensor.elemento_quimico === 'pm40') {
                
            //     const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
            //     values ('${fechaISO}', '${sensor.id}', ${data.pm40}) returning id `
            //     const {rows} = await Pool.query(insertatemp);
            //     console.log('INGRESANDO DATOS pm40');

            // }
            // if (sensor.elemento_quimico === 'no2') {
                
            //     const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
            //     values ('${fechaISO}', '${sensor.id}', ${data.no2}) returning id `
            //     const {rows} = await Pool.query(insertatemp);
            //     console.log('INGRESANDO DATOS n02');

            // }
            // if (sensor.elemento_quimico === 'so2') {
                
            //     const insertatemp = `insert into sparksiot.detasensor (timesensor, idsensor, valor)
            //     values ('${fechaISO}', '${sensor.id}', ${data.so2}) returning id `
            //     const {rows} = await Pool.query(insertatemp);
            //     console.log('INGRESANDO DATOS so2');

            // }
        }

       }

       
       return {
        msg:'datos extraidos con exito',
        status:202
       }
    }

    fechastringIso(fechaObj){
        const anio = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        const hora = String(fechaObj.getHours()).padStart(2, '0');
        const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
        const segundos = String(fechaObj.getSeconds()).padStart(2, '0');

        // Construir la cadena en formato ISO 8601
        const fechaISO = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`;
        return fechaISO
    }

}

const MigracionEx = new Migracion();
module.exports = MigracionEx