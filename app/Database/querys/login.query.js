// estos son los querys para la base de datos

module.exports = {
    
    registerquery(user, token){
        let {nombre, apellido, newpassword, email} = user;
        return `insert into sparksiot.users (nombre, apellido, password, email, token) 
            values('${nombre}', '${apellido}', '${newpassword}', '${email}', '${token}')
        RETURNING id, password, nombre, token`
    },
    searchemail(email){
        return `select token, password, nombre, email, id from sparksiot.users where email = '${email}' `
    }

}