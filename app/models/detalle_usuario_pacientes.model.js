module.exports = (sequelize, Sequelize) => {
  const DetalleUsPa = sequelize.define('detalle_usuario_pacientes', {
    iddetalle: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    estado: {
      type: Sequelize.INTEGER
    },
    idusuario: {
      type: Sequelize.INTEGER
    },
    idpaciente: {
      type: Sequelize.INTEGER
    }
  }
  )
  return DetalleUsPa
}
