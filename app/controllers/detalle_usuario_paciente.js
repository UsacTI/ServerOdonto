const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Detalle_usu_paciente = db.Detalle_Usuario_paciente
const { QueryTypes } = require('sequelize')

exports.create = (req, res) => {
  const detalle = {}
  try {
    detalle.estado = 1
    detalle.idusuario = req.body.idusuario
    detalle.idpaciente = req.body.idpaciente
    Detalle_usu_paciente.create(detalle).then(result => {
      res.status(200).json({
        message: 'Detalle Usuario Paciente creado correctamente = ' + result.iddetalle,
        detalleestudianteusuario: result
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

exports.searchEstudiante = (req, res) => {
  const id = req.params.id
  // console.log(id)
  Detalle_usu_paciente.findAll({
    where: { idusuario: id }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      detalleestudiantepaciente: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.searchPaciente = (req, res) => {
  const id = req.params.id
  Detalle_usu_paciente.findAll({
    where: { idpaciente: id }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      detalleestudiantepaciente: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}
