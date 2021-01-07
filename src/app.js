const Users = require('./models/User');
const Funcionalidad = require('./models/Funcionalidad');
const Afiliado = require('./models/Afiliado');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');

const places = require('./routes/places');
const rondas = require('./routes/rondas');
const puntuaciones = require('./routes/puntuaciones');
const roles = require('./routes/roles');
const preguntas = require('./routes/preguntas');
const preguntaUsuario = require('./routes/preguntaUsuario');
const solicitudesA = require('./routes/SolicitudesAfiliacion');
const bancosSuscriptor = require('./routes/bancosSuscriptor');
const conyugues = require('./routes/conyugues');
const suscriptores = require('./routes/suscriptores');
const afiliados = require('./routes/afiliados');
const herederos = require('./routes/herederos');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const favorites = require('./routes/favorites');
const funcionalidadesRol = require('./routes/funcionalidadesRol');
const funcionalidades = require('./routes/funcionalidades');
const visits = require('./routes/visits');
const visitsPlaces = require('./routes/visitsPlaces');
const applications = require('./routes/applications');

const findAppBySecret = require('./middlewares/findAppBySecret');
const findAppByApplicationId = require('./middlewares/findAppByApplicationId');
const authApp = require('./middlewares/authApp')();
const allowCORs = require('./middlewares/allowCORs')();

const db = require('./config/database');
const secrets = require('./config/secrets');

db.connect();
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(findAppBySecret);
// app.use(findAppByApplicationId);
// app.use(authApp.unless({method: 'OPTIONS'}));

 app.use(allowCORs.unless({path: '/public'}));

app.use(
  jwtMiddleware({secret: secrets.jwtSecret})
    .unless({path: ['/solicitudesAfiliacion','/users','/sessions'], method: ['GET','OPTIONS']})
)

app.use('/places',places);
app.use('/rondas',rondas);
app.use('/puntuaciones',puntuaciones);
app.use('/preguntaUsuario',preguntaUsuario);
app.use('/preguntas',preguntas);
app.use('/afiliados',afiliados);
app.use('/bancosSuscriptor',bancosSuscriptor);
app.use('/places',visitsPlaces);
app.use('/herederos',herederos);
app.use('/suscriptores',suscriptores);
app.use('/users',users);
app.use('/sessions',sessions);
app.use('/conyugues',conyugues);
app.use('/favorites',favorites);
app.use('/roles',roles);
app.use('/visits',visits);
app.use('/funcionalidades',funcionalidades);
app.use('/funcionalidadesRol',funcionalidadesRol);
app.use('/applications',applications)
app.use('/solicitudesAfiliacion',solicitudesA)


app.get('/demo',function(req,res){
  Funcionalidad.remove({}).then(r => res.json(r));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
