let _estudianteService = null;
class EstudianteController {
    constructor({EstudianteService}){
        _estudianteService = EstudianteService;
    }
    listarEstudiante(req, res){
        return _estudianteService.listar(req, res);
    }
    listaridEstudiante(req, res){
        return _estudianteService.listarid(req, res);
    }
}

module.exports = EstudianteController;