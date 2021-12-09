const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../config");
const app = require(".");
//servicios
const {
    UsuarioService
} = require('../services');

//controladores
const {
    UsuarioController
} = require('../controllers');

//rutas
const {
    UsuarioRoutes
} = require('../routes/index.routes');

const Routes = require('../routes');
const container = createContainer();
container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    }).register({
        UsuarioService: asClass(UsuarioService).singleton()
    }).register({
        UsuarioController: asClass(UsuarioController.bind(UsuarioController)).singleton()
    }).register({
        UsuarioRoutes: asFunction(UsuarioRoutes).singleton()
    });

module.exports = container;
