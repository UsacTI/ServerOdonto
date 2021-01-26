module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('expediente', {
    idexpediente: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    evaluacion_clinica: {
      type: Sequelize.STRING
    },
    roentgenologia: {
      type: Sequelize.STRING
    },
    precauciones: {
      type: Sequelize.STRING
    },
    equipo_diagnostico: {
      type: Sequelize.STRING
    },
    habitos: {
      type: Sequelize.STRING
    },
    diagnostico: {
      type: Sequelize.STRING
    },
    oclusion: {
      type: Sequelize.STRING
    },
    hma: {
      type: Sequelize.STRING
    },
    hma_comentario: {
      type: Sequelize.STRING
    },
    hoa: {
      type: Sequelize.STRING
    },
    hoa_comentario: {
      type: Sequelize.STRING
    },
    dolor_dentario: {
      type: Sequelize.STRING
    },
    idpaciente: {
      type: Sequelize.INTEGER
    }
  })

  return Customer
}
