const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Expediente = db.Expediente
const { QueryTypes } = require('sequelize')
var fs = require('fs')
const formidable = require('formidable')

exports.createExpediente = (req, res) => {
  const expediente = {}
  try {
    expediente.mc = req.body.mc
    expediente.hpe = req.body.hpe
    expediente.hma = req.body.hma
    expediente.hma_comentario = req.body.hma_comentario
    expediente.hoa = req.body.hoa
    expediente.hoa_comentario = req.body.hoa_comentario
    expediente.dolor_dentario = req.body.dolor_dentario
    expediente.habitos = req.body.habitos
    expediente.roentgenologia = req.body.roentgenologia
    expediente.precauciones = req.body.precauciones
    expediente.evaluacion_clinica = req.body.evaluacion_clinica
    expediente.oclusion = req.body.oclusion
    expediente.oclusion_comentario = req.body.oclusion_comentario
    expediente.roentoenogramas = req.body.roentoenogramas
    expediente.roentoenogramas_descripcion = req.body.roentoenogramas_descripcion
    expediente.opciones = req.body.opciones
    expediente.opciones_descripcion = req.body.opciones_descripcion
    expediente.consulta = req.body.consulta
    expediente.estudios_especiales = req.body.estudios_especiales
    expediente.equipo_diagnostico = req.body.equipo_diagnostico
    expediente.diagnostico = req.body.diagnostico
    expediente.idpaciente = req.body.idpaciente
    expediente.radiografia = '' // req.body.radiografia
    expediente.aprobar_expediente = 0
    expediente.aprobar_plan = 0

    Expediente.create(expediente).then(result => {
      res.status(200).json({
        message: 'Expediente creado con el ID = ' + result.idexpediente,
        expediente: result
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
  const id = req.params.id
  Expediente.findOne({
    where: { idexpediente: id }
  })
    .then(results => {
      res.status(200).json({
        message: 'Expediente con ID = ' + id,
        expediente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Expediente con ID =' + id,
        error: error
      })
    })
}

exports.AllFiles = (req, res) => {
  const idpaciente = req.params.id
  Expediente.findAll({
    where: { idpaciente: idpaciente }
  }).then(results => {
    // console.log(results)
    res.status(200).json({
      expediente: results
    })
  }).catch(error => {
    // console.log(error)
    res.status(500).json({
      message: 'Error!',
      error: error
    })
  })
}

exports.update = async (req, res) => {
  var idexpediente = req.params.id
  try {
    const updatedObject = {
      mc: req.body.mc,
      hpe: req.body.hpe,
      hma: req.body.hma,
      hma_comentario: req.body.hma_comentario,
      hoa: req.body.hoa,
      hoa_comentario: req.body.hoa_comentario,
      dolor_dentario: req.body.dolor_dentario,
      habitos: req.body.habitos,
      roentgenologia: req.body.roentgenologia,
      precauciones: req.body.precauciones,
      evaluacion_clinica: req.body.evaluacion_clinica,
      oclusion: req.body.oclusion,
      oclusion_comentario: req.body.oclusion_comentario,
      roentoenogramas: req.body.roentoenogramas,
      roentoenogramas_descripcion: req.body.roentoenogramas_descripcion,
      opciones: req.body.opciones,
      opciones_descripcion: req.body.opciones_descripcion,
      consulta: req.body.consulta,
      estudios_especiales: req.body.estudios_especiales,
      equipo_diagnostico: req.body.equipo_diagnostico,
      diagnostico: req.body.diagnostico,
      radiografia: req.body.radiografia
      // aprobar_expediente: 0
      // aprobar_plan: 0
    }
    const result = await Expediente.update(updatedObject, { returning: true, where: { idexpediente: idexpediente } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar id expediente = ' + idexpediente,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta de expediente [' + idexpediente + ']',
      expediente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el expediente = ' + idexpediente,
      error: error.message
    })
  }
}

exports.updateExpediente = async (req, res) => {
  var idexpediente = req.params.id
  var estado = req.body.estado
  try {
    const updatedObject = {
      aprobar_expediente: estado
    }
    const result = await Expediente.update(updatedObject, { returning: true, where: { idexpediente: idexpediente } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar id expediente = ' + idexpediente,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta de expediente [' + idexpediente + ']',
      expediente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el expediente = ' + idexpediente,
      error: error.message
    })
  }
}

exports.createDiagnostico = async (req, res) => {
  var idexpediente = req.params.id
  var diagnostico2 = req.body.diagnostico
  console.log(idexpediente)
  console.log(diagnostico2)
  try {
    const updatedObject = {
      diagnostico: diagnostico2
    }
    const result = await Expediente.update(updatedObject, { returning: true, where: { idexpediente: idexpediente } })
    if (!result) {
      console.log('error1')
      res.status(500).json({
        message: 'No se pudo actualizar id expediente = ' + idexpediente,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta de expediente [' + idexpediente + ']',
      expediente: updatedObject
    })
  } catch (error) {
    console.log('error2')
    res.status(500).json({
      message: 'No se pudo actualizar el expediente = ' + idexpediente,
      error: error.message
    })
  }
}

exports.updateExpedientePlan = async (req, res) => {
  var idexpediente = req.params.id
  var estado = req.body.estado
  try {
    const updatedObject = {
      aprobar_plan: estado
    }
    const result = await Expediente.update(updatedObject, { returning: true, where: { idexpediente: idexpediente } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar id expediente = ' + idexpediente,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta de expediente [' + idexpediente + ']',
      expediente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el expediente = ' + idexpediente,
      error: error.message
    })
  }
}

// const formidable = require('express-formidable')
// const express = require('express')
// const app = express()
// app.use(formidable())

exports.InsertarRadiografia = async (req, res) => {
  new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    // console.log(files.images.path)
    // for (const file of Object.entries(files)) {
    //   console.log(file)
    // }

    var idexpediente = req.params.id

    var bitmap = fs.readFileSync(files.images.path)
    var base64 = new Buffer(bitmap).toString('base64')

    await db.sequelize.query(
      `update expedientes
    set radiografia = ?
    where idexpediente = ?;`,
      {
        replacements: [base64, idexpediente],
        type: QueryTypes.SELECT
      }
    )
      .then(results => {
        res.status(200).json({
          message: 'Expediente radiografia con ID = ' + idexpediente,
          tratamientos: results
        })
      })
      .catch(error => {
        // console.log(error)
        res.status(500).json({
          message: 'No se encontró el Expediente ID =' + idexpediente,
          error: error
        })
      })
  })
}

exports.BuscarRadiografia = (req, res) => {
  const id = req.params.id
  Expediente.findOne({
    where: { idexpediente: id },
    attributes: ['radiografia']
  })
    .then(results => {
      res.status(200).json({
        message: 'Expediente con ID = ' + id,
        expediente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Expediente con ID =' + id,
        error: error
      })
    })
}

exports.updateOdontograma = async (req, res) => {
  var idexpediente = req.params.id
  console.log(idexpediente)
  console.log(req.body.odontograma)
  try {
    const updatedObject = {
      odontograma: req.body.odontograma
    }
    const result = await Expediente.update(updatedObject, { returning: true, where: { idexpediente: idexpediente } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar id expediente = ' + idexpediente,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta de expediente [' + idexpediente + ']',
      expediente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el expediente = ' + idexpediente,
      error: error.message
    })
  }
}

exports.buscarOdontograma = (req, res) => {
  const id = req.params.id
  Expediente.findOne({
    where: { idexpediente: id },
    attributes: ['odontograma']
  })
    .then(results => {
      res.status(200).json({
        message: 'Expediente con ID = ' + id,
        expediente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Expediente con ID =' + id,
        error: error
      })
    })
}
