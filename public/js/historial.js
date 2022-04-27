'use strict'
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const Schema = mongoose.Schema


const HistorialSchema = Schema({
	fecha: { type: String, required: true },
	resultado: { type: String, required: true, unique: true },
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


module.exports = mongoose.model('Historial', HistorialSchema);
