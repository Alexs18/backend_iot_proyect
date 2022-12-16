let Pool = require('../Database/index');
let bcrypt = require('bcrypt');
let token = require('jsonwebtoken');
let {SECRET_KEY} = require('../config');
let {registerquery} = require('../Database/querys/login.query');
let {validationResult} = require('express-validator');

class Login{

    async login(req, res){

        console.log('esta pasando al log');
       let {password, email} = req.body;
       
       let token2 = token.sign({body:'linux'}, '1234', {expiresIn:'1h'});
       console.log(token2);
       console.log('pasa por el login ');
       console.log('lo decodifica');
       let token3 = token.decode(token2)
       console.log('decodificado');
       console.log(token3);
       console.log('verfiricwdo');
       token.verify(token2, '1234', (error, token)=>{
        console.log('token verificao');
        console.log(token);
        console.log('errr');
        console.log(error);
       })
       try {
       
        let {rows} = await Pool.query(`select * from users where email = '${email}'`);
        
        if (rows[0].password === password) {
            res.status(200).json({
                message:`El usuario ${rows[0].nombre} se logió correctamente`,
                token:true,
                nombre:rows[0].nombre,
                id:rows[0].id
            });
            console.log('el usuario se logeo correctamente');   
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
        let user = {nombre, apellido, newpassword, email};
        let savedtoken = token.sign(user, SECRET_KEY, {expiresIn:'24h'});
       
        try {

            let queryregister = registerquery(user, savedtoken);
            let UserRegisted = await Pool.query(queryregister);
            res.status(200).json({
                message:'usuario Registrado correctamente',
                id:UserRegisted.rows,
                icon:'sucess'
            })
        } catch (error) {

            res.status(500).json({
                message:'ocurrio un error con el servidor, contacte con el administrador',
                icon:'error'
            })
        }
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