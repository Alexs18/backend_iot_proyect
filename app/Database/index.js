const pg = require('pg');
const {configDatabase} = require('../config')

console.log('configuracion db');
console.log(configDatabase);
const Pool = new pg.Pool(configDatabase);

module.exports = Pool

