const { Client } = require("../config/dbconection");

class MatriculaService {
  async crear(req, res) {
    try {
      const { tipopago, npapeleta, valor, fechadepo, observacion } = req.body;
      const query = {
        text: "INSERT INTO tbmatricula	(tipopago, npapeleta, valor, fechadepo, observacion) VALUES ($1, $2, $3, $4, $5)",
        values: [
          `${tipopago}`,
          `${npapeleta}`,
          `${valor}`,
          `${fechadepo}`,
          `${observacion}`,
        ],
      };
      await Client().query(query, (err, result) => {
        console.log(err);
        if (err) {
          res.status(500).send({ message: "Error al crear matricula" });
        } else {
          res.status(200).send({ message: "Canton creado" });
        }
      });
    } catch (error) {
      res.status(404).send({ message: "variables incorrrectas" });
    }
  }

  async editar(req, res) {
    const { tipopago, npapeleta, valor, fechadepo, observacion } = req.body;
    var id = req.params.id;
    var validate =
      tipopago === undefined ||
      npapeleta === undefined ||
      valor === undefined ||
      fechadepo === undefined ||
      id === undefined
        ? false
        : true;
    const query = {
      text: "UPDATE tbmatricula SET tipopago = $1, npapeleta = $2, valor = $3, fechadepo = $3, observacion = $3 where idusuario = $4",
      values: [
        `${tipopago}`,
        `${npapeleta}`,
        `${valor}`,
        `${fechadepo}`,
        `${observacion}`,
        `${id}`,
      ],
    };
    try {
      if (validate) {
        await Client().query(query, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Error al editar matricula",
            });
          } else {
            res.status(200).send({
              message: "Matricula editado",
            });
          }
        });
      } else {
        res.status(404).send({
          message: "faltan datos",
        });
      }
    } catch (error) {
      res.status(404).send({
        message: "Hubo un problema",
      });
    }
  }

  async listar(req, res) {
    await Client().query("SELECT * FROM tbmatricula", (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Error al listar matriculas",
        });
      } else {
        res.status(200).json({
          message: "Lista de matriculas",
          data: result.rows,
        });
      }
    });
  }

  async eliminar(req, res) {
    var id = req.params.Id;
    const query = {
      text: "DELETE FROM tbmatricula WHERE idusuario = $1",
      values: [`${id}`],
    };
    var validate = id === undefined ? false : true;
    try {
      if (validate) {
        await Client().query(query, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Error al eliminar matricula",
            });
          } else {
            res.status(200).send({
              message: "Matricula eliminado",
            });
          }
        });
      } else {
        res.status(404).send({
          message: "faltan datos",
        });
      }
    } catch (error) {
      res.status(404).send({
        message: "Hubo un problema",
      });
    }
  }
}
module.exports = MatriculaService;
