let Express = require('express');
let Router = Express.Router();
let {RegisterSensors, ListaSensors} = require('../Controllers/sensors.controller')

Router.post('/registersensor', RegisterSensors)
Router.get('/listsensor', ListaSensors);

module.exports = Router