module.exports = (sequelize, Sequelize) => {
    const Cita = sequelize.define('cita', {
      idcita: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      
    })
  
    return Cita
  }
  