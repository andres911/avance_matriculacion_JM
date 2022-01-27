const { Client } = require("../config/dbconection");

class EstudianteService {
  async listar(req, res) {
    await Client().query(
      "SELECT idestudiante, cedula, apellidop as primer_apellido, apellidom as segundo_apellido, CONCAT(apellidop, ' ', apellidom) apellidos, nombres, direccion, referencia, telefono FROM tbestudiante",
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Error al listar los estudiantes",
          });
        } else {
          res.status(200).json({
            message: "Lista de estudiantes",
            data: result.rows,
          });
        }
      }
    );
  }

  async listarid(req, res) {
    var id = req.params.Id;
    const query = {
      text: "select idestudiante, cedula, apellidop as primer_apellido, apellidom as segundo_apellido, CONCAT(apellidop, ' ', apellidom) apellidos, nombres, direccion, referencia, telefono from tbestudiante where cedula = $1",
      values: [`${id}`],
    };
    try {
      await Client().query(query, (err, result) => {
        if (err) {
          res.status(500).send({
            message: "Error al encontrar al estudiante",
          });
        } else {
          res.status(200).send({
            message: "Estudiante encontrado",
            data: result.rows,
          });
        }
      });
    } catch (error) {
      res.status(404).send({
        message: "Hubo un problema",
      });
    }
  }
}

module.exports = EstudianteService;
