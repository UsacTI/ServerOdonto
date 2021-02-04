module.exports = (sequelize, Sequelize) => {
  const Cita = sequelize.define('citas', {
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
      type: Sequelize.STRING
    },
    doctor: {
      type: Sequelize.STRING
    },
    hora: {
      type: Sequelize.STRING
    }

  })
  return Cita
}
