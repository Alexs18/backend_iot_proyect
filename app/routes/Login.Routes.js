let Express = require('express');
let Router = Express.Router();
let {login, Register, GetRol} = require('../Controllers/login.controller')

Router.post('/login', login);
Router.post('/register', Register);
Router.get('/permisos/:id', GetRol);

module.exports = Router;