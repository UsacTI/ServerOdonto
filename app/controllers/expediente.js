const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Expediente = db.Expediente

exports.createExpediente = (req, res) => {
  const expediente = {}
  try {
    expediente.evaluacion_clinica = req.body.evaluacion_clinica
    expediente.roentgenologia = req.body.roentgenologia
    expediente.precauciones = req.body.precauciones
    expediente.equipo_diagnostico = req.body.equipo_diagnostico
    expediente.habitos = req.body.habitos
    expediente.diagnostico = req.body.diagnostico
    expediente.oclusion = req.body.oclusion
    expediente.oclusion_comentario = req.body.oclusion_comentario
    expediente.hma = req.body.hma
    expediente.hma_comentario = req.body.hma_comentario
    expediente.hoa = req.body.hoa
    expediente.hoa_comentario = req.body.hoa_comentario
    expediente.dolor_dentario = req.body.dolor_dentario
    expediente.idpaciente = req.body.idpaciente
    Expediente.create(expediente).then(result => {
      res.status(200).json({
        message: 'Expediente creado con el ID = ' + result.idexpediente,
        paciente: result
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
  Expediente.findOne({
    where: { idexpediente: id }
  })
    .then(results => {
      res.status(200).json({
        message: 'Expediente con ID = ' + id,
        paciente: results
      })
    })
    . catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Expediente con ID =' + id,
        error: error
      })
    })
}

exports.AllFiles = (req, res) => {
  const idpaciente = req.body.id
  Expediente.findAll({
    where: { idpaciente: idpaciente }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      pacientes: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}
