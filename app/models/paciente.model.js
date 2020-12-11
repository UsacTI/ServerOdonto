module.exports = (sequelize, Sequelize) => {
  const Paciente = sequelize.define('paciente', {
    idpaciente: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombres: {
      type: Sequelize.STRING
    },
    apellidos: {
      type: Sequelize.STRING
    },
    nacimiento: {
      type: Sequelize.DATE
    },
    genero: {
      type: Sequelize.INTEGER
    },
    direccion: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.INTEGER
    },
    consulta: {
      type: Sequelize.STRING
    },
    escolaridad: {
      type: Sequelize.STRING
    },
    profesion: {
      type: Sequelize.STRING
    },
    nacionalidad: {
      type: Sequelize.STRING
    },
    transporte: {
      type: Sequelize.STRING
    },
    usuario: {
      type: Sequelize.STRING
    },
    contrasenia: {
      type: Sequelize.STRING
    }
  })

  return Paciente
}
