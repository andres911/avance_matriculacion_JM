const { Router } = require("express");

module.exports = function ({ MatriculaController }) {
  const router = Router();
  router.post("/nuevaMatricula", MatriculaController.crearMatricula);
  router.get("/listarMatricula", MatriculaController.listarMatricula);
  router.get("/listaridMatricula/:Id", MatriculaController.listaridMatricula);
  router.get("/listarfechaMatricula", MatriculaController.listarfechaMatricula);
  router.put("/editarMatricula/:Id", MatriculaController.editarMatricula);
  router.delete(
    "/eliminarMatricula/:Id",
    MatriculaController.eliminarMatricula
  );
  return router;
};
