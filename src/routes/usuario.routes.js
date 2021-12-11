const { Router } = require("express");
const jsonwebtoken = require("jsonwebtoken");

module.exports = function ({ UsuarioController }) {
  const router = Router();
  router.post("/nuevoUsuario", UsuarioController.crearUsuario);
  router.get("/listarUsuario", UsuarioController.listarUsuario);
  router.patch("/editarUsuario/:UserId", UsuarioController.editarUsuario);
  router.delete("/eliminarUsuario/:UserId", UsuarioController.eliminarUsuario);

  router.post("/veriUsuario", UsuarioController.veriUsuario);
  //*verificamos token una seccion
  router.post("/testToken", verifiToken, UsuarioController.testToken);

  function verifiToken(req, res, next) {
    if (!req.headers.authorization)
      return res.status(401).json("No autorizado");

    const token = req.headers.authorization.substr(7);
    if (token !== "") {
      const content = jsonwebtoken.verify(token, "admin");
      req.data = content;
      next();
    } else {
      res.status(401).json("token vacio");
    }
  }

  return router;
};
