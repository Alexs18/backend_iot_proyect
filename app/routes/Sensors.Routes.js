let Express = require('express');
let Router = Express.Router();
let {RegisterSensors, ListaSensors, DeleteSensors, UpdateSensor} = require('../Controllers/sensors.controller')

Router.post('/registersensor', RegisterSensors);
Router.get('/listsensor', ListaSensors);
Router.put('/deletelogic/:id',DeleteSensors);
Router.put('/UpdateSensor/:id',UpdateSensor);

module.exports = Router