const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Paciente = db.Paciente
var año = (new Date()).getFullYear()
var mes = (new Date()).getMonth()
var dia = (new Date()).getDate()

/*
Estados:
  0 = Paciente registrado por oficina informacion
  1 = Paciente registrado por oficina trabajo social
  3 = Pendiente de pago de boleta de primera cita
  4 = Boleta pagada primera cita / listo para asignar a estudiante / aparece en banco pacientes
  */
exports.createPaciente = (req, res) => {
  const paciente = {}
  try {
    paciente.nombres = req.body.nombres
    paciente.apellidos = req.body.apellidos
    paciente.genero = req.body.genero
    paciente.nacimiento = req.body.nacimiento
    paciente.dpi = req.body.dpi
    paciente.contrasenia = req.body.contrasenia
    paciente.direccion = req.body.direccion
    paciente.telefono = req.body.telefono
    paciente.nohijos = req.body.nohijos
    paciente.escolaridad = req.body.escolaridad
    paciente.nivel = req.body.nivel
    paciente.profesion = req.body.profesion
    paciente.nacionalidad = req.body.nacionalidad
    paciente.transporte = req.body.transporte
    paciente.tipopaciente = req.body.tipopaciente
    paciente.consulta = req.body.consulta
    paciente.doctor = req.body.doctor
    paciente.aprobacion = 1

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      paciente.contrasenia = hash
      // console.log(hash);
      Paciente.count().then(function (c) {
        // console.log(c)
        paciente.usuario = 'PI' + c + dia + mes + año
        // Save to MySQL database
        // console.log(paciente)
        Paciente.create(paciente).then(result => {
          res.status(200).json({
            message: 'Paciente creado con el ID = ' + result.idpaciente,
            paciente: result
          })
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

exports.createPacienteTrab = (req, res) => {
  const paciente = {}
  try {
    paciente.nombres = req.body.nombres
    paciente.apellidos = req.body.apellidos
    paciente.genero = req.body.genero
    paciente.nacimiento = req.body.nacimiento
    paciente.dpi = req.body.dpi
    paciente.contrasenia = req.body.contrasenia
    paciente.direccion = req.body.direccion
    paciente.telefono = req.body.telefono
    paciente.consulta = req.body.consulta
    paciente.tipopaciente = 5 // no clasificado
    paciente.aprobacion = 0

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      paciente.contrasenia = hash
      // console.log(hash);
      Paciente.count().then(function (c) {
        // console.log(c)
        paciente.usuario = req.body.dpi
        // Save to MySQL database
        Paciente.create(paciente).then(result => {
          res.status(200).json({
            message: 'Paciente creado con el ID = ' + result.idpaciente,
            paciente: result
          })
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

exports.updateById = async (req, res) => {
  try {
    const idus = req.body.id
    const paciente = await Paciente.findOne({ where: { idpaciente: idus } })
    // console.log(paciente)
    if (!paciente) {
      // return a response to client
      res.status(404).json({
        message: 'No se ha encontrado el paciente con ID = ' + idus,
        customer: '',
        error: '404'
      })
    } else {
      const updatedObject = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        genero: req.body.genero,
        nacimiento: req.body.nacimiento,
        dpi: req.body.cui,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        nohijos: req.body.nohijos,
        escolaridad: req.body.escolaridad,
        nivel: req.body.nivel,
        profesion: req.body.trauoficio,
        transporte: req.body.transporte,
        doctor: req.body.doctor,
        consulta: req.body.consulta,
        tipopaciente: req.body.tipopaciente
      }
      const result = await Paciente.update(updatedObject, { returning: true, where: { idpaciente: idus } })
      if (!result) {
        res.status(500).json({
          message: 'No se pudo actualizar el paciente con No.DPI = ' + req.params.dpi,
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
      message: 'No se pudo actualizar el paciente con No.idus = ' + req.params.dpi,
      error: error.message
    })
  }
}

exports.filterById = (req, res) => {
  const id = req.body.id
  Paciente.findOne({
    where: { idpaciente: id }
  })
    .then(results => {
      res.status(200).json({
        message: 'Paciente con ID = ' + id,
        paciente: results
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No se encontró el Paciente con ID =' + id,
        error: error
      })
    })
}

exports.retrieveAllPatients = (req, res) => {
  Paciente.findAll()
    .then(PatientsInfo => {
      res.status(200).json({
        message: 'Todos los Pacientes',
        pacientes: PatientsInfo
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No hay Pacientes',
        error: error
      })
    })
}

exports.PatientsState1 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 1 }
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

exports.PatientsState1 = (req, res) => {
  Paciente.findAll({
    attributes: ['idpaciente', 'usuario', 'apellidos', 'nombres', 'dpi'],
    where: { aprobacion: 1 }
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

exports.CambioEstado = async (req, res) => {
  try {
    const id = req.params.idpaciente
    const estado = req.body.estado
    const updatedObject = {
      aprobacion: estado
    }
    const result = await Paciente.update(updatedObject, { returning: true, where: { idpaciente: id } })
    if (!result) {
      res.status(500).json({
        message: 'No se pudo actualizar el paciente con ID = ' + id,
        error: 'No se actualizó'
      })
    }
    res.status(200).json({
      message: 'Actualización correcta [' + id + ']',
      paciente: updatedObject
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el paciente con ID = ' + req.params.idpaciente,
      error: error.message
    })
  }
}
