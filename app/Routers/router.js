let express = require("express");
let router = express.Router();

const prestamo = require("../Controllers/prestamo.controller.js");

router.post("/prestamo/create", prestamo.create);
router.get("/prestamo/all", prestamo.retrieveAllPrestamo);
router.get("/prestamo/onebyid/:id", prestamo.getPrestamoById);
router.put("/prestamo/update/:id", prestamo.updateById);
router.delete("/prestamo/delete/:id", prestamo.deleteById);

module.exports = router;
