let _usuarioService = null;
class UsuarioController {
  constructor({ UsuarioService }) {
    _usuarioService = UsuarioService;
  }
  crearUsuario(req, res) {
    return _usuarioService.crear(req, res);
  }
  editarUsuario(req, res) {
    return _usuarioService.editar(req, res);
  }
  listarUsuario(req, res) {
    return _usuarioService.listar(req, res);
  }
  veriUsuario(req, res) {
    return _usuarioService.verifica(req, res);
  }
  testToken(req, res) {
    return _usuarioService.test(req, res);
  }
  eliminarUsuario(req, res) {
    return _usuarioService.eliminar(req, res);
  }
}

module.exports = UsuarioController;
