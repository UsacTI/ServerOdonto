const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const db = require('../config/db.config')

exports.query = (req, res) => {
  const query = req.body.query
  db.sequelize.query(query)
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
