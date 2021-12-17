let _matriculaService = null;
class MatriculaController {
  constructor({ MatriculaService }) {
    _matriculaService = MatriculaService;
  }
  crearMatricula(req, res) {
    return _matriculaService.crear(req, res);
  }
  editarMatricula(req, res) {
    return _matriculaService.editar(req, res);
  }
  listarMatricula(req, res) {
    return _matriculaService.listar(req, res);
  }
  eliminarMatricula(req, res) {
    return _matriculaService.eliminar(req, res);
  }
}

module.exports = MatriculaController;
