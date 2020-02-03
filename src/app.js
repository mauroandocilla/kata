var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

// dependencias
var wizard = require('./routes/wizard');

var app = express();

// configuraciones
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// rutas
app.post('/api/wizard/attack/', wizard.attack);

// Iniciar servidor
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
