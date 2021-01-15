const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Usuario = db.Usuario

exports.createStudent = (req, res) => {
  const usuario = {}
  try {
    usuario.carnet = req.body.carnet
    usuario.cui = req.body.cui
    usuario.nombres = req.body.nombres
    usuario.apellidos = req.body.apellidos
    usuario.nacimiento = req.body.nacimiento
    usuario.genero = req.body.genero
    usuario.telefono = req.body.telefono
    usuario.contrasenia = req.body.contrasenia
    usuario.tipousuario = 3 // estudiante

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      usuario.contrasenia = hash
      Usuario.create(usuario).then(result => {
        res.status(200).json({
          message: 'Estudiante creado con el ID = ' + result.idusuario,
          paciente: result
        })
      })

    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}
