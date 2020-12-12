let express = require('express')
let router = express.Router()

const customers = require('../controllers/controller.js')

router.post('/api/customers/create', customers.create) // http://localhost:8080/api/customers/create
router.post('/api/customers/createP', customers.createPaciente)
router.post('/api/customers/login', customers.login)
router.get('/api/customers/prueba', customers.prueba)

// router.get('/api/customers/all', customers.retrieveAllCustomers)
router.post('/api/customers/onebyid/:id', customers.getCustomerById)

// router.get('/api/customers/pagination', customers.pagination)
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting)
// router.put('/api/customers/update/:id', customers.updateById)
// router.delete('/api/customers/delete/:id', customers.deleteById)

module.exports = router
