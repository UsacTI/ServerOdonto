const express = require('express')
const router = express.Router()

const customers = require('../controllers/controller.js')
const patients = require('../controllers/paciente.js')
const querypacients = require('../controllers/querysPacientes.js')

router.post('/api/customers/create', customers.create) // http://localhost:8080/api/customers/create
router.post('/api/customers/createP', customers.createPaciente)
router.post('/api/customers/login', customers.login)
router.get('/api/customers/prueba', ensure_token, customers.prueba)
router.post('/api/queryPaciente/prueba2', querypacients.prueba2)

// Crear Paciente
router.post('/patients/createOfiInfo', patients.createPaciente)
router.post('/patients/createTrabSocial', patients.createPacienteTrab)

// Actualizar Paciente
router.post('/patients/update/:dpi', patients.updateById)

// Buscar Paciente por DPI
router.post('/patients/search/:dpi', patients.filterById)

// Todos los pacientes
router.get('/patients/all/', patients.retrieveAllPatients)

// router.get('/api/customers/all', customers.retrieveAllCustomers)
router.post('/api/customers/onebyid/:id', customers.getCustomerById)

function ensure_token (req, res, next) {
  // console.log(localStorage.getItem('token'));
  /* if (localStorage.getItem('token') != null) {
        req.token = localStorage.getItem('token');
        next();
    }else{
        res.sendStatus(403);
    } */

  const bearerHeader = req.headers.authorization
  // console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}
module.exports = router
