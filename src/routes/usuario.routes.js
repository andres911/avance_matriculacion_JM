const { Router } = require('express');

module.exports = function({ UsuarioController}) {
    const router = Router();
    router.post('/nuevoUsuario', UsuarioController.crearUsuario);
    router.get('/listarUsuario', UsuarioController.listarUsuario);
    router.patch('/editarUsuario/:UserId', UsuarioController.editarUsuario);
    router.delete('/eliminarUsuario/:UserId', UsuarioController.eliminarUsuario);
    return router;
}