'use strict';
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const historialSchema = Schema({
	fecha: { type: String },
	resultado: { type: String },
	// created_at: { type: Date, default: Date.now }
});

////Obtener fecha
//let date = new Date()

///let day = date.getDate()
//let month = date.getMonth() + 1
//let year = date.getFullYear()

//if(month < 10){
//console.log(`${day}-0${month}-${year}`)
//}else{
//console.log(`${day}-${month}-${year}`)
//}

module.exports = mongoose.model('Historial', historialSchema);
