const { default: axios } = require('axios');
var express = require('express');
const config = require('../config');
const verifyToken = require('../middleware/verifyAccess');
var app = express()



app.get('/unityTest', function(req, res) {
	var url = req.protocol + '://' + req.get('host')
    
	// Obtenemos el usuario de la cookie y se lo mandamos a la pagina que muestra el juego
	var user = req.cookies.user || '';
	var token = req.cookies.token || '';
	var title = 'Unity Test';
    res.render('pages/unity', {title: title,url,user,token});
 
});



app.get('/',verifyToken, function(req, res) {
	// render to views/index.ejs template file
	var title = 'Videojuegos';
    res.render('index', {
    	title: title
    });

});

app.get('/logout', function(req, res) {
		res.cookie("token","",{httpOnly:true,maxAge:-1})
		res.cookie("user","",{httpOnly:true,maxAge:-1})
	 res.redirect("/");
});



app.get('/images',verifyToken, function(req, res) {
	// render to views/index.ejs template file
	var title = 'Images';
	

	const token = req.cookies.token
	const headers = {'auth_key' : token}
	var title = 'Images';
	var data;

	console.log(headers)
    console.log(config.API.imagesUrl)
	axios.get(config.API.imagesUrl,{headers})
	.then(response => {
		 data = response.data;
		 //console.log(data)
    res.render('pages/images', {title: title,data});
	})
	.catch(error=> {
		console.log(error)
	})

});


app.get('/login', function(req, res) {
	// render to views/index.ejs template file
	var title = 'Login';
    res.render('pages/login', {title: title});

});

// Login operations with async call
app.post('/login', async (req, res) => {

	try {
	var user = {"username": req.body.user, "password": req.body.password};
	var login_response = await axios.post(config.API.loginurl,user);
	var user_details = await axios.get(config.API.userurl+login_response.data.user);
	var arreglo = ["Defectos","Chatarra"];
	var usertype= arreglo.join(); 
	console.log(usertype);
	
		res.cookie("token",login_response.data.token,{httpOnly:true})
		res.cookie("user",login_response.data.user,{httpOnly:true})
		res.cookie("userType", usertype,{httpOnly:true})
		
	} catch (error){
		console.log(error)
	}	
		
		return res.redirect('/');
	

});



module.exports = app;
