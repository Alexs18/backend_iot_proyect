let tokenlibrary = require('jsonwebtoken')
let {SECRET_KEY} = require('../config');

class AuthMiddelware{
    AuthToken(req, res, next){
        let {token} = req.params;
        tokenlibrary.verify(token, SECRET_KEY, (err, decoded)=>{
            if (err) {
                res.status(400).json({
                    status:400,
                    message:'token invalido',
                    tokenvalid:false
                })
            }
            next();
        })
       
        // } catch (error) {
        //     console.log('token invalido');
        //     console.log(error);
        // }
        // // console.log('token validado');
        // console.log(validtoken);
    }
}
let InstanciaAuth = new AuthMiddelware();
module.exports = InstanciaAuth