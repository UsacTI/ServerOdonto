module.exports = (sequelize, Sequelize) => {
    const Cita = sequelize.define('cita', {
      idpaciente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      monto: {
        type: Sequelize.INTEGER
      }
      
    })
  
    return Cita
  }
  