let Express = require('express');
let Router = Express.Router();
let {EditUser, DeleteUser} = require('../Controllers/users.controller')

Router.put('/EditUser/:id', EditUser);
Router.put('/DeleteUser/:id', DeleteUser);

module.exports = Router;