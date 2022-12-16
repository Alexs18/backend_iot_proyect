let Express = require('express');
let {body, validationResult} = require('express-validator');
let Router = Express.Router();
let {RegisterValidation} = require('../middleware/login.validation');
let Validationregister = require('../Validation/ValidationRegister')
let {login, Register, GetRol} = require('../Controllers/login.controller');

Router.post('/login', login);
Router.post('/register', Validationregister ,RegisterValidation, Register);
Router.get('/permisos/:id', GetRol);

module.exports = Router;