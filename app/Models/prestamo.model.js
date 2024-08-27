module.exports = (sequelize, Sequelize) => {
  const Prestamo = sequelize.define("prestamo", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,  
      primaryKey: true,
    },
    libroId: {
      type: Sequelize.INTEGER,
    },
    usuarioId: {
      type: Sequelize.INTEGER,
    },
    fechaSalida: {
      type: Sequelize.DATE,
    },
    fechaMaxima: {
      type: Sequelize.DATE,
    },
    fechaDevolucion: {
      type: Sequelize.DATE,
    },
  });

  return Prestamo;
}; 