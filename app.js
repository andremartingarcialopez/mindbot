'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mysql = require('mysql');
const User = require('./public/user');
const Historial = require('./public/js/historial.js');
//const { connect } = require('http2');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3000;
//URI A BASE DE DATOS CON MONGODB

// CONEXIÓN A LA BASE DE DATOS NUBE
mongoose.connect(
	'mongodb+srv://admin:Admin.123@chatbot.4nzz7.mongodb.net/chatbot',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// CONEXIÓN A LA BASE DE DATOS LOCAL
/*mongoose.connect('mongodb://127.0.0.1:27017/chatbot', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});*/

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('Connected to Mongo');
});

connection.once('error', (err) => {
	console.log('Error connecting', err);
});

// CONEXIÓN A LA BASE DE DATOS MYSQL
/* const conexion = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mindbot',
});

conexion.connect((error) => {
	if (error) throw error;
	console.log('Connected to MySQL!');
}); */

// METODO PARA REGISTRAR USUARIOS
app.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	const user = new User({ name, email, password });
	await user.save();

	const sql = 'INSERT INTO users SET ?';
	const Obj = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};
	conexion.query(sql, Obj);
	res.redirect('/iniciar_sesion.html');
});

// METODO PARA AUTENTICAR USUARIOS
app.post('/authenticate', async (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			//res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
			res.redirect('iniciar_sesion.html');
		} else if (!user) {
			//res.status(200).send('EL USUARIO NO EXISTE');
			res.redirect('iniciar_sesion.html');
		} else {
			user.isCorrectPassword(password, (err, result) => {
				if (err) {
					//res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
					res.redirect('iniciar_sesion.html');
				} else if (result) {
					/* res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE'); */
					res.redirect('/principal.html');
				} else {
					//res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
					res.redirect('iniciar_sesion.html');
				}
			});
		}
	});

	/*conexion.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
		if(rows.length > 0) {
			res.redirect('/principal.html');
		} else {
		  console.log('not');
		}

	});*/
});

app.set('view engine', 'ejs');

app.get('/historial', (req, res) => {
	///*****RESPALDO MONGO DB*****
	Historial.find({}, function (err, historial) {
		res.render('historial', {
			historialList: historial,
		});
	});

	///*****RESPALDO MYSQL*****
	/*conexion.query('SELECT * FROM historial', (err, historial) => {
		res.render('historial', {
			historialList: historial
		});
  });*/
});

app.post('/result', function (req, res) {
	const date = new Date();
	const fecha = date.toLocaleDateString();

	let newHistorial = new Historial({
		fecha: fecha,
		resultado: req.body.resultado,
	});
	if (req.body.resultado) {
		newHistorial.save();
	}

	const sql = 'INSERT INTO historial SET ?';
	const historial = {
		fecha: fecha,
		resultado: req.body.resultado,
	};
	conexion.query(sql, historial);
	res.redirect('/principal.html');
});
/* function guardar() {
	const text = document.querySelector('p.footer__texto');
	console.log(text.textContent);
} */

/* app.get('/', (req, res) => {
	res.send('Hola' + req.body.); */
/* const text = document.querySelector('p.footer__texto');
	console.log(text.textContent); */

/* 	let newHistorial = new Historial({
		resultado: req.body.resultado,
	});
	newHistorial.save();*/ /* 
	res.redirect('/principal.html'); */
/* }); */

/* app.post('/', async (req, res) => {
	const text = document.querySelector('p.diagnostic');
	const { result } = text.textContent;
	const historial = new Historial({ result });
	await historial.save();
	res.redirect('/principal.html');
}); */

/* app.post('/insertar', (req, res) => {
	console.log('POST /insertar');
	console.log(req.body);

	let historial = new Historial();
	historial.fecha = req.body.fecha;
	historial.resultado = req.body.resultado;

	historial.save((err, historialAll) => {
		if (err) res.status(500).send({ message: `Error al guardar:  ${err}` });

		res.status(200).send({ historial: historialAll });
	});
});
//METODO GET PARA OBTENER HISTORIAL
app.get('/historial', (req, res) => {
	Historial.find({}, (err, historial) => {
		if (err)
			return res
				.status(500)
				.send({ message: `Error a realizar la petición: ${err}` });
		if (!historial)
			return res.status(404).send({ message: `El registro existe` });

		res.send(200, { historial });
	});
}); */

app.listen(3000, () => {
	console.log('server started');
});
module.exports = app;
