let Express = require('express');
let Router = Express.Router();
let {RegisterValidation} = require('../middleware/login.validation');
let Validationregister = require('../Validation/ValidationRegister');
let {AuthToken} = require('../middleware/Auth')
let {login, Register, GetRol, logout, ValidateToken} = require('../Controllers/login.controller');


Router.post('/login', login);
Router.post('/logout', logout);
Router.post('/register', Validationregister ,RegisterValidation, Register);
Router.get('/permisos/:id', GetRol);
Router.get('/ValidarToken/:token', AuthToken, ValidateToken);

module.exports = Router;