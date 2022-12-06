let Pool = require('../Database/index');
let bcrypt = require('bcrypt')

class Login{
    async login(req, res){

       let {password, email} = req.body;
       try {
        let {rows} = await Pool.query(`select * from users where email = '${email}'`);
        
        if (rows[0].password === password) {
            res.status(200).json({
                message:`El usuario ${rows[0].nombre} se logió correctamente`,
                token:true,
                nombre:rows[0].nombre,
                id:rows[0].id
            })   
        }else{
            res.status(400).json({
                message:`Las contraseñas no coinciden`,
                token:false
            })
        }
       
       } catch (error) {
        console.log(error)
       }
       
    }
    async Register(req, res){
        let {nombre, apellido, password, email} = req.body;
        let newpassword = await bcrypt.hash(password, 10);

        let UserRegisted = await Pool.query(`insert into users (nombre, apellido, password, email) values($1, $2, $3, $4)
        RETURNING id, password, nombre`, [nombre, apellido, newpassword, email])
        res.status(200).json({
            message:'usuario Registrado correctamente',
            id:UserRegisted.rows
        })
    }
    async GetRol(req, res){
        try {
            let {id} = req.params;
            let PermisosUser = await Pool.query(`select u.nombre, r.descripcion as descripcion  from users as u
            inner join roluser as ru
        on u.id = ru.idusuario
            inner join rol as r
        on ru.idrol = r.id where u.id = ${id}`);
        res.status(200).json({
            message:'este es el rol del usuario',
            rol: PermisosUser.rows[0].descripcion
        })   
        } catch (error) {
            console.log(error);
        }
    }
}

let InstanciaLogin = new Login();
module.exports = InstanciaLogin;