const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')
const Tratamiento = db.Tratamiento

exports.AllFiles = (req, res) => {
  Tratamiento.findAll()
    .then(results => {
    // console.log(results)
      res.status(200).json({
        tratamiento: results
      })
    }).catch(error => {
    // console.log(error)
      res.status(500).json({
        message: 'Error!',
        error: error
      })
    })
}
