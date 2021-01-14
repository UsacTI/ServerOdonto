const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Paciente = db.Paciente
var año = (new Date()).getFullYear()
var mes = (new Date()).getMonth()
var dia = (new Date()).getDate()

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

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      paciente.contrasenia = hash
      // console.log(hash);
      Paciente.count().then(function (c) {
        // console.log(c)
        paciente.usuario = req.body.dpi // 'PI' + c + dia + mes + año
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

    bcrypt.hash(req.body.contrasenia, saltRounds).then(function (hash) {
      paciente.contrasenia = hash
      // console.log(hash);
      Paciente.count().then(function (c) {
        // console.log(c)
        paciente.usuario = 'PI' + c + dia + mes + año
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
    const DPI = req.params.dpi
    const paciente = await Paciente.findByPk(DPI) // Paciente.findOne({ where: { dpi: DPI } })

    if (!paciente) {
      // return a response to client
      res.status(404).json({
        message: 'No se ha encontrado el paciente con No.DPI = ' + DPI,
        customer: '',
        error: '404'
      })
    } else {
      const updatedObject = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        genero: req.body.genero,
        nacimiento: req.body.nacimiento,
        dpi: req.body.dpi,
        contrasenia: req.body.contrasenia,
        direccion: req.body.direccion,
        telefono: req.body.telefono
      }
      const result = await Paciente.update(updatedObject, { returning: true, where: { dpi: DPI } })
      if (!result) {
        res.status(500).json({
          message: 'No se pudo actualizar el paciente con No.DPI = ' + req.params.dpi,
          error: 'No se actualizó'
        })
      }

      res.status(200).json({
        message: 'Actualización correcta [' + DPI + ']',
        customer: updatedObject
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo actualizar el paciente con No.DPI = ' + req.params.dpi,
      error: error.message
    })
  }
}

exports.filterById = (req, res) => {
  const Dpi = req.query.dpi

  Paciente.findAll({
    attributes: ['nombres', 'apellidos', 'genero', 'nacimiento', 'dpi', 'contrasenia', 'direccion', 'telefono'],
    where: { dpi: Dpi }
  })
    .then(results => {
      res.status(200).json({
        message: 'Paciente con DPI = ' + Dpi,
        customers: results
      })
    })
    . catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'No se encontró el Paciente con DPI =' + Dpi,
        error: error
      })
    })
}

exports.retrieveAllPatients = (req, res) => {
  Paciente.findAll()
    .then(PatientsInfo => {
      res.status(200).json({
        message: 'Todos los Pacientes',
        customers: PatientsInfo
      })
    })
    . catch(error => {
      // console.log(error)
      res.status(500).json({
        message: 'No hay Pacientes',
        error: error
      })
    })
}
