module.exports = (sequelize, Sequelize) => {
  const Cita = sequelize.define('cita', {
    idcita: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idpaciente: {
      type: Sequelize.INTEGER
    },
    id_detalle_procedimiento_tratamiento: {
      type: Sequelize.INTEGER
    },
    fecha: {
      type: Sequelize.Date
    },
    doctor: {
      type: Sequelize.String
    }

  })

  return Cita
}
