const Express = require('express');
const cors = require('cors')
const app = Express();
const RouterPeliculas = require('./app/routes/Peliculas.Routes');
const RouterRelaciones = require('./app/routes/Relaciones.Routes');
const RouterLogin = require('./app/routes/Login.Routes');
const cookie = require('cookie-parser');

app.use(Express.json());
app.use(cors())
app.use(cookie())
app.use(RouterPeliculas, RouterRelaciones);
app.use(RouterLogin);

app.listen(3000, ()=>{
    console.log('estamos corriendo en el 3000')
})
