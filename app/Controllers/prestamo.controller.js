const db = require('../Config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
  let prestamo = {};

  try {
    prestamo.libroId = req.body.libroId;
    prestamo.usuarioId = req.body.usuarioId;
    prestamo.fechaSalida = req.body.fechaSalida;
    prestamo.fechaMaxima = req.body.fechaMaxima;
    prestamo.fechaDevolucion = req.body.fechaDevolucion;


    Prestamo.create(prestamo).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.id}`,
        prestamo: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllPrestamo = (req, res) => {
  Prestamo.findAll()
    .then(prestamoInfo => {
      res.status(200).json({
        message: "Prestamos recuperados exitosamente!",
        prestamo: prestamoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener los prestamos!",
        error: error.message
      });
    });
};

exports.getPrestamoById = (req, res) => {
  let prestamoId = req.params.id;
  Prestamo.findByPk(prestamoId)
    .then(prestamo => {
      if (prestamo) {
        res.status(200).json({
          message: `Prestamo obtenido con id = ${prestamoId}`,
          prestamo: prestamo
        });
      } else {
        res.status(404).json({
          message: `No se encontró el prestamo con id = ${prestamoId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el prestamo",
        error: error.message
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let prestamoId = req.params.id;
    let prestamo = await Prestamo.findByPk(prestamoId);

    if (!prestamo) {
      res.status(404).json({
        message: `No fue posible actualizar el prestamo con id = ${prestamoId}`,
        prestamo: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        libroId: req.body.libroId,
        usuarioId: req.body.usuarioId,
        fechaSalida: req.body.fechaSalida,
        fechaMaxima: req.body.fechaMaxima,
        fechaDevolucion: req.body.fechaDevolucion

      };
      let result = await Prestamo.update(updatedObject, { returning: true, where: { id: prestamoId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el prestamo con id = " + req.params.id,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Prestamo actualizado con éxito, id = ${prestamoId}`,
        prestamo: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el prestamo con id = " + req.params.id,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let prestamoId = req.params.id;
    let prestamo = await Prestamo.findByPk(prestamoId);

    if (!prestamo) {
      res.status(404).json({
        message: `No existe el prestamo con id = ${prestamoId}`,
        error: "404"
      });
    } else {
      await prestamo.destroy();
      res.status(200).json({
        message: `Prestamo eliminado con éxito, id = ${prestamoId}`,
        prestamo: prestamo
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el prestamo con id = " + req.params.id,
      error: error.message
    });
  }
};