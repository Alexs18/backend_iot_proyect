const dotenv = require('dotenv').config({
    path:'.env'
});

module.exports = {
    SECRET_KEY:process.env.SECRET_KEY,
    APPPORT:process.env.APPPORT,
    USER:process.env.userdatabase,
    PASSWORD:process.env.passworddatabase,
    configDatabase:{
        port:process.env.PORT,
        database:process.env.DATABASE,
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD
    }
}
