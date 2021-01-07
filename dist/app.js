"use strict";

var Users = require('./models/User');

var Funcionalidad = require('./models/funcionalidad');

var Afiliado = require('./models/Afiliado');

var express = require('express');

var path = require('path');

var favicon = require('serve-favicon');

var logger = require('morgan');

var bodyParser = require('body-parser');

var jwtMiddleware = require('express-jwt');

var places = require('./routes/places');

var rondas = require('./routes/rondas');

var puntuaciones = require('./routes/puntuaciones');

var roles = require('./routes/roles');

var preguntas = require('./routes/preguntas');

var preguntaUsuario = require('./routes/preguntaUsuario');

var solicitudesA = require('./routes/SolicitudesAfiliacion');

var bancosSuscriptor = require('./routes/bancosSuscriptor');

var conyugues = require('./routes/conyugues');

var suscriptores = require('./routes/suscriptores');

var afiliados = require('./routes/afiliados');

var herederos = require('./routes/herederos');

var users = require('./routes/users');

var sessions = require('./routes/sessions');

var favorites = require('./routes/favorites');

var funcionalidadesRol = require('./routes/funcionalidadesRol');

var funcionalidades = require('./routes/funcionalidades');

var visits = require('./routes/visits');

var visitsPlaces = require('./routes/visitsPlaces');

var applications = require('./routes/applications');

var findAppBySecret = require('./middlewares/findAppBySecret');

var findAppByApplicationId = require('./middlewares/findAppByApplicationId');

var authApp = require('./middlewares/authApp')();

var allowCORs = require('./middlewares/allowCORs')();

var db = require('./config/database');

var secrets = require('./config/secrets');

db.connect();
var app = express(); // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public'))); // app.use(findAppBySecret);
// app.use(findAppByApplicationId);
// app.use(authApp.unless({method: 'OPTIONS'}));

app.use(allowCORs.unless({
  path: '/public'
}));
app.use(jwtMiddleware({
  secret: secrets.jwtSecret
}).unless({
  path: ['/solicitudesAfiliacion', '/users', '/sessions'],
  method: ['GET', 'OPTIONS']
}));
app.use('/places', places);
app.use('/rondas', rondas);
app.use('/puntuaciones', puntuaciones);
app.use('/preguntaUsuario', preguntaUsuario);
app.use('/preguntas', preguntas);
app.use('/afiliados', afiliados);
app.use('/bancosSuscriptor', bancosSuscriptor);
app.use('/places', visitsPlaces);
app.use('/herederos', herederos);
app.use('/suscriptores', suscriptores);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/conyugues', conyugues);
app.use('/favorites', favorites);
app.use('/roles', roles);
app.use('/visits', visits);
app.use('/funcionalidades', funcionalidades);
app.use('/funcionalidadesRol', funcionalidadesRol);
app.use('/applications', applications);
app.use('/solicitudesAfiliacion', solicitudesA);
app.get('/demo', function (req, res) {
  Funcionalidad.remove({}).then(function (r) {
    return res.json(r);
  });
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error); // render the error page

  res.status(err.status || 500);
  res.json(err);
});
module.exports = app;