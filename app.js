const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./public/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

const mongo_uri =
	'mongodb+srv://Lucio:Lucio3311714641@chatbot.4nzz7.mongodb.net/chatbot';

mongoose.connect(mongo_uri, function (err) {
	if (err) {
		throw err;
	} else {
		console.log(`Connected to Mongo ${mongo_uri}`);
	}
});

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	const user = new User({ name, email, password });
	user.save((err) => {
		if (err) {
			res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
		} else {
			res.status(200).send('USUARIO REGISTRADO');
		}
	});
});

app.post('/authenticate', (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
		} else if (!user) {
			res.status(200).send('EL USUARIO NO EXISTE');
		} else {
			user.isCorrectPassword(password, (err, result) => {
				if (err) {
					res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
				} else if (result) {
					res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE');
				} else {
					res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
				}
			});
		}
	});
});

app.listen(3000, () => {
	console.log('server started');
});
module.exports = app;
