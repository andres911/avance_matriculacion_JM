const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../config");
const app = require(".");
//servicios
const { UsuarioService, MatriculaService } = require("../services");

//controladores
const { UsuarioController, MatriculaController } = require("../controllers");

//rutas
const { UsuarioRoutes, MatriculaRoutes } = require("../routes/index.routes");

const Routes = require("../routes");
const container = createContainer();
container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    UsuarioService: asClass(UsuarioService).singleton(),
    MatriculaService: asClass(MatriculaService).singleton(),
  })
  .register({
    UsuarioController: asClass(
      UsuarioController.bind(UsuarioController)
    ).singleton(),
    MatriculaController: asClass(
      MatriculaController.bind(MatriculaController)
    ).singleton(),
  })
  .register({
    UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
    MatriculaRoutes: asFunction(MatriculaRoutes).singleton(),
  });

module.exports = container;
