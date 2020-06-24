const express = require('express');
const morgan = require('morgan');
var cors = require("cors");

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
//app.use('/dispositivo', require('./APIRutas/datosNodo.js'));
//app.use('/usuario', require('./APIRutas/datosUsuario.js'));
app.use('/twitter', require('./TwitRutas/datosTwitter.js'));


app.listen(app.get('port'), () => {
  console.log("Server listening and working");
});