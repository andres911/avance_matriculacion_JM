const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../config");
const app = require(".");
//servicios
const {
    UsuarioService,
    EstudianteService
} = require('../services');

//controladores
const {
    UsuarioController,
    EstudianteController
} = require('../controllers');

//rutas
const {
    UsuarioRoutes,
    EstudianteRoutes
} = require('../routes/index.routes');

const Routes = require('../routes');
const container = createContainer();
container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    }).register({
        UsuarioService: asClass(UsuarioService).singleton(),
        EstudianteService:asClass(EstudianteService).singleton()
    }).register({
        UsuarioController: asClass(UsuarioController.bind(UsuarioController)).singleton(),
        EstudianteController: asClass(EstudianteController.bind(EstudianteController)).singleton()
    }).register({
        UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
        EstudianteRoutes: asFunction(EstudianteRoutes).singleton()
    });

module.exports = container;
