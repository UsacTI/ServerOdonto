const db = require('../config/db.config')
const Customer = db.Customer
const Paciente = db.Paciente
var año = (new Date()).getFullYear()
var mes = (new Date()).getMonth()
var dia = (new Date()).getDate()

exports.create = (req, res) => {
  const customer = {}

  try {
    customer.firstname = req.body.firstname
    customer.lastname = req.body.lastname
    customer.address = req.body.address
    customer.age = req.body.age

    // Save to MySQL database
    Customer.create(customer).then(result => {
      res.status(200).json({
        message: 'Upload Successfully a Customer with id = ' + result.id,
        customer: result
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

exports.createPaciente = (req, res) => {
  const paciente = {}
  try {
    paciente.nombres = req.body.nombres
    paciente.apellidos = req.body.apellidos
    paciente.nacimiento = req.body.nacimiento
    paciente.genero = req.body.genero
    paciente.direccion = req.body.direccion
    paciente.telefono = req.body.telefono
    paciente.consulta = req.body.consulta
    paciente.escolaridad = req.body.escolaridad
    paciente.profesion = req.body.profesion
    paciente.nacionalidad = req.body.nacionalidad
    paciente.transporte = req.body.transporte
    paciente.contrasenia = req.body.contrasenia

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
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message
    })
  }
}

//  PI – 345 – 01 – 15 – 2010.

exports.getCustomerById = (req, res) => {
  // find all Customer information from
  const customerId = req.params.id
  Customer.findByPk(customerId)
    .then(customer => {
      res.status(200).json({
        message: ' Successfully Get a Customer with id = ' + customerId,
        customers: customer
      })
    })
    . catch(error => {
      // log on console
      console.log(error)

      res.status(500).json({
        message: 'Error!',
        error: error
      })
    })
}

exports.login = (req, res) => {
  const usuario = req.body.usuario
  const contrasenia = req.body.contrasenia

  Paciente.findOne({
    attributes: ['usuario', 'nombres', 'apellidos'],
    where: { usuario: usuario, contrasenia: contrasenia }
  })
    .then(results => {
      res.status(200).json({
        message: 'Usuario ' + usuario,
        paciente: results
      })
    })
    . catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error!',
        error: error
      })
    })
}

exports.prueba = (req, res) => {
  db.sequelize.query('select count(usuario) from pacientes')
    .then(results => {
      console.log(results[0])
      res.status(200).json(
        results[0][0]
      )
    })
    . catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error!',
        error: error
      })
    })
}
