var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql2')
var config = require('./config')
var myConnection  = require('express-myconnection')
var cookieParser = require('cookie-parser');
var axios = require("axios");
const verify = require('./middleware/verifyAccess');


var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}

app.use(myConnection(mysql, dbOptions, 'pool'))

/**
 * setting up the templating view engine
 */ 
 app.set('view engine', 'ejs')
 var path = require('path');
 app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index')
var videojuegos = require('./routes/videojuegos')
var api = require('./routes/api');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
//app.use(verify)

app.use('/', index)
app.use('/videojuegos', videojuegos)
app.use('/api',api);

app.listen(3000, function(){
	console.log('Node Countries Light running at port 3000: http://127.0.0.1:3000')

})