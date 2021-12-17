const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../config");
const app = require(".");
//servicios
const {
  UsuarioService,
  EstudianteService,
  MatriculaService,
} = require("../services");

//controladores
const {
  UsuarioController,
  EstudianteController,
  MatriculaController,
} = require("../controllers");

//rutas
const {
  UsuarioRoutes,
  EstudianteRoutes,
  MatriculaRoutes,
} = require("../routes/index.routes");

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
    EstudianteService: asClass(EstudianteService).singleton(),
    MatriculaService: asClass(MatriculaService).singleton(),
  })
  .register({
    UsuarioController: asClass(
      UsuarioController.bind(UsuarioController)
    ).singleton(),
    EstudianteController: asClass(
      EstudianteController.bind(EstudianteController)
    ).singleton(),
    MatriculaController: asClass(
      MatriculaController.bind(MatriculaController)
    ).singleton(),
  })
  .register({
    UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
    EstudianteRoutes: asFunction(EstudianteRoutes).singleton(),
    MatriculaRoutes: asFunction(MatriculaRoutes).singleton(),
  });

module.exports = container;
