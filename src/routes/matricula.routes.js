const { Router } = require("express");

module.exports = function ({ MatriculaController }) {
  const router = Router();
  router.post("/nuevoMatricula", MatriculaController.crearMatricula);
  router.get("/listarMatricula", MatriculaController.listarMatricula);
  router.patch("/editarMatricula/:UserId", MatriculaController.editarMatricula);
  router.delete(
    "/eliminarMatricula/:UserId",
    MatriculaController.eliminarMatricula
  );
  return router;
};
