const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Usuario = db.Usuario

exports.createStudent = (req, res) => {
  const usuario = {}
  try {
    usuario.carne = req.body.carnet
    usuario.cui = req.body.cui
    usuario.nombres = req.body.nombres
    usuario.apellidos = req.body.apellidos
    usuario.nacimiento = req.body.nacimiento
    usuario.genero = req.body.genero
    usuario.telefono = req.body.telefono
    usuario.contrasenia = req.body.contrasenia
    usuario.tipousuario = 3 // estudiante
    usuario.usuarios_idusuario = 1

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

exports.createProfessor = (req, res) => {
  const usuario = {}
  try {
    usuario.carne = req.body.carnet
    usuario.cui = req.body.cui
    usuario.nombres = req.body.nombres
    usuario.apellidos = req.body.apellidos
    usuario.nacimiento = req.body.nacimiento
    usuario.genero = req.body.genero
    usuario.telefono = req.body.telefono
    usuario.contrasenia = req.body.contrasenia
    usuario.tipousuario = 2 // profesor
    usuario.area = req.body.area
    usuario.subarea = req.body.subarea
    usuario.usuarios_idusuario = 1

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

exports.filterById = (req, res) => {
  const id = req.body.id
  Usuario.findOne({
    where: { idusuario: id }
  })
    .then(results => {
      res.status(200).json({
        message: 'Usuario con ID = ' + id,
        paciente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Usuario con ID =' + id,
        error: error
      })
    })
}

exports.updateById = async (req, res) => {
  try {
    const idus = req.body.id
    const paciente = await Usuario.findOne({ where: { idusuario: idus } })
    // console.log(idus)
    if (!paciente) {
      // return a response to client
      res.status(404).json({
        message: 'No se ha encontrado el Usuario con ID = ' + idus,
        customer: '',
        error: '404'
      })
    } else {
      const updatedObject = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        genero: req.body.genero,
        nacimiento: req.body.nacimiento,
        cui: req.body.cui,
        telefono: req.body.telefono,
        carne: req.body.carne,
        area: req.body.area,
        subarea: req.body.subarea
      }
      // console.log(updatedObject)
      const result = await Usuario.update(updatedObject, { returning: true, where: { idusuario: idus } })
      if (!result) {
        res.status(500).json({
          message: 'No se pudo actualizar el Usuario con No.DPI = ' + req.params.cui,
          error: 'No se actualizó'
        })
      }
      res.status(200).json({
        message: 'Actualización correcta [' + idus + ']',
        customer: updatedObject
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el Usuario con No.idus = ' + req.params.cui,
      error: error.message
    })
  }
}

exports.UserState2 = (req, res) => {
  Usuario.findAll({
    attributes: ['idusuario', 'carne', 'nombres', 'apellidos', 'area', 'subarea'],
    where: { tipousuario: 2 }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      usuarios: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.UserState3 = (req, res) => {
  Usuario.findAll({
    attributes: ['idusuario', 'carne', 'nombres', 'apellidos'],
    where: { tipousuario: 3 }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      usuarios: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.Asignacion = async (req, res) => {
  var idprof = req.body.idprofesor
  var idest = req.body.estudiante
  // console.log(idprof)
  // console.log(idest)
  try {
    const updatedObject = {
      usuarios_idusuario: parseInt(idprof)
    }
    const result = await Usuario.update(updatedObject, { returning: true, where: { idusuario: idest } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar id del profesor en el estudiante = ' + idest,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta id estudiante [' + idest + ']',
      customer: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el Usuario con No.idus = ' + idest,
      error: error.message
    })
  }
}

exports.susEstudiantes = (req, res) => {
  const idprofesor = req.params.id
  // console.log(idprofesor)
  Usuario.findAll({
    attributes: ['idusuario', 'carne', 'nombres', 'apellidos'],
    where: { usuarios_idusuario: idprofesor }
  }).then(results => {
    res.status(200).json({
      estudiante: results
    })
  }).catch(error => {
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}
