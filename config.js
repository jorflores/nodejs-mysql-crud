var config = {
	database: {
		// host:	  'localhost', 		// database host
		host:	  '127.0.0.1', 		// database host
		user: 	  'test_user', 			// your database username
		password: 'Test1234', 			// your database password
		port: 	  3306, 			// default MySQL port
		db: 	  'demodatabase' // your database name
	},
	server: {
		host:'127.0.0.1', // the host for the server
		port: '3000' // the port for the server
	} ,
	 API: {
		 loginurl: "https://chatarrap-api.herokuapp.com/users/login",
		 userurl: "https://chatarrap-api.herokuapp.com/users/",
		 imagesUrl: "https://chatarrap-api.herokuapp.com/images",
		 resultadosJuegoURL: "https://calm-bastion-98916.herokuapp.com/scores/"
	 }
}

module.exports = config