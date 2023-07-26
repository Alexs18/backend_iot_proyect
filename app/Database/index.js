const pg = require('pg');
const {configDatabase, configDatabaseServer} = require('../config')
debugger;
const Pool = new pg.Pool(configDatabase);
debugger
const PoolServer = new pg.Pool(configDatabaseServer)
module.exports = {Pool, PoolServer}

