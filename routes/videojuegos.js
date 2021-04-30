var express = require('express')
var app = express()



 app.get('/', function(req, res) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM videojuegos ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
                console.log(err)
				res.render('videojuegos/list', {
					title: 'All Countries',
					data: ''
				})
			} else {
				// render to views/country/list.ejs template file
				res.render('pages/list', {
					title: 'All Countries', 
					data: rows
				})
			}
		})
	})
}) 


app.get('/add', function(req, res){	
	// render to views/country/add.ejs
	res.render('pages/add', {
		title: 'Agregar Nuevo Videojuego',
		nombre:'',
		año:'',
		clasificacion:'',
		comentarios:'',
		calificacion:''	
	})
})


// ADD NEW COUNTRY POST ACTION
app.post('/add', function(req, res){	

	var videojuego = {
		nombre: req.body.nombre ,
		año: req.body.año,
		clasificacion: req.body.clasificacion,
		comentarios: req.body.comentarios,
		calificacion: req.body.calificacion
}
console.log(videojuego);

		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO videojuegos SET ?', videojuego, function(err, result) {
				//if(err) throw err
				if (err) {
					console.log(err);

				} else {							
					res.redirect('/videojuegos')
				}
			})
		})
	})

	app.post('/delete/(:id)', function(req, res, next) {
		var videojuego = { id: req.params.id }
		
		req.getConnection(function(error, conn) {
			conn.query('DELETE FROM videojuegos WHERE id = ' + req.params.id, videojuego, function(err, result) {

					res.redirect('/videojuegos')

			})
		})
	})

	app.get('/edit/(:id)', function(req, res){
		req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM videojuegos WHERE id = ' + req.params.id, function(err, rows, fields) {
				if(err) throw err
				
				// if country not found
				if (rows.length <= 0) {
					console.log('error', 'Videojuego no encontrado con id = ' + req.params.id)
					res.redirect('/videojuegos')
				}
				else { // if country found
					// render to views/country/edit.ejs template file
					res.render('pages/edit', {
						title: 'Editar Videojuego', 
						//data: rows[0],
						id: rows[0].id,
						nombre: rows[0].nombre,
						año: rows[0].año,
						clasificacion: rows[0].clasificacion,
						comentarios: rows[0].comentarios,
						calificacion: rows[0].calificacion	
					})
				}			
			})
		})
	})

	// EDIT COUNTRY POST ACTION
app.post('/edit/(:id)', function(req, res) {

		var videojuego = {
			nombre: req.body.nombre ,
			año: req.body.año,
			clasificacion: req.body.clasificacion,
			comentarios: req.body.comentarios,
			calificacion: req.body.calificacion
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE videojuegos SET ? WHERE id = ' + req.params.id, videojuego, function(err, result) {

				console.log(result)
					// render to views/country/add.ejs
					res.redirect('/videojuegos')
				})
		})
	})
		
		


module.exports = app;