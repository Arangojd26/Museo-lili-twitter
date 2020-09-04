const express = require('express');
const morgan = require('morgan');
var cors = require("cors");
var bodyParser = require('body-parser')

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// bodyParser = {
//   json: {limit: '80mb', extended: true},
//   urlencoded: {limit: '80mb', extended: true}
// };
app.use(bodyParser.json({limit: '90mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '90mb', extended: true}))

//Routes
//app.use('/dispositivo', require('./APIRutas/datosNodo.js'));
//app.use('/usuario', require('./APIRutas/datosUsuario.js'));
app.use('/twitter', require('./TwitRutas/datosTwitter.js'));


app.listen(app.get('port'), () => {
  console.log("Server listening and working");
});