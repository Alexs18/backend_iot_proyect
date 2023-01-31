let Pool = require('../Database/index');

class user{

    async EditUser(req, res){
        let {
            nombre, apellido,
            correo, telefono
        } = req.body;
        let {id} = req.params;
        
    }

}