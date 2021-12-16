const { Router } = require('express');

module.exports = function({EstudianteController}){
    const router = Router();
    router.get('/listarEstudiante', EstudianteController.listarEstudiante);
    router.get('/listaridEstudiante/:Id', EstudianteController.listaridEstudiante);
    return router;
}