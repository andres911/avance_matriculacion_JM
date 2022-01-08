const { Client } = require("../config/dbconection");

class MatriculaService {
  async crear(req, res) {
    try {
      /* const { idestudiante, tipopago, npapeleta, valor, fechadepo, observacion } = req.body;
      const query = {
        text: "INSERT INTO tbmatricula	(idestudiante, tipopago, npapeleta, valor, fechadepo, observacion) VALUES ($1, $2, $3, $4, $5, $6)",
        values: [
          `${idestudiante}`,
          `${tipopago}`,
          `${npapeleta}`,
          `${valor}`,
          `${fechadepo}`,
          `${observacion}`,
        ],
      }; */
      const {
        periodo,
        idestudiante,
        fechamatricula,
        numpapeleta,
        numfactura,
        valor,
        tipomatricula,
        estadop,
        observacion,
        tipodep,
        fechadep,
      } = req.body;
      const query = {
        text: "INSERT INTO tbmatricula	(periodo, idestudiante, fechamatricula, numpapeleta, numfactura, valor, tipomatricula, estadop, observacion, tipodep, fechadep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        values: [
          `${periodo}`,
          `${idestudiante}`,
          `${fechamatricula}`,
          `${numpapeleta}`,
          `${numfactura}`,
          `${valor}`,
          `${tipomatricula}`,
          `${estadop}`,
          `${observacion}`,
          `${tipodep}`,
          `${fechadep}`,
        ],
      };
      await Client().query(query, (err, result) => {
        console.log(err);
        if (err) {
          res.status(500).send({ message: "Error al crear matricula" });
        } else {
          res.status(200).send({ message: "Matricula creada" });
        }
      });
    } catch (error) {
      res.status(404).send({ message: "variables incorrrectas" });
    }
  }

  async editar(req, res) {
    const {
      // periodo,
      // idestudiante,
      // fechamatricula,
      numpapeleta,
      // numfactura,
      valor,
      // tipomatricula,
      // estadop,
      observacion,
      tipodep,
      fechadep,
    } = req.body;
    //const fechadep2 = new Date(fechadep); //comvertir string a date
    var id = req.params.Id;
    var validate =
      //periodo === undefined ||
      //idestudiante === undefined ||
      //fechamatricula === undefined ||
      numpapeleta === undefined ||
      //numfactura === undefined ||
      valor === undefined ||
      //tipomatricula === undefined ||
      //estadop === undefined ||
      observacion === undefined ||
      tipodep === undefined ||
      fechadep === undefined ||
      id === undefined
        ? false
        : true;
    const query = {
      text: "UPDATE tbmatricula SET numpapeleta =$1, valor = $2, observacion = $3, tipodep = $4, fechadep = $5 where idmatricula = $6",
      values: [
        // `${periodo}`,
        // `${idestudiante}`,
        // `${fechamatricula}`,
        `${numpapeleta}`,
        // `${numfactura}`,
        `${valor}`,
        // `${tipomatricula}`,
        // `${estadop}`,
        `${observacion}`,
        `${tipodep}`,
        `${fechadep}`,
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
              es: true,
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
    await Client().query(
      "SELECT * FROM tbmatricula AS m JOIN tbestudiante AS e ON m.idestudiante=e.idestudiante ORDER BY e.nombresc ASC",
      (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Error al listar matriculas",
          });
        } else {
          res.status(200).json({
            data: result.rows,
          });
        }
      }
    );
  }

  async listarid(req, res) {
    var id = req.params.Id;
    const query = {
      text: "select cedula, nombresc, idmatricula, nummatricula, periodo, numpapeleta, numfactura, valor, tipomatricula, estadop from tbestudiante inner join tbmatricula on tbmatricula.idmatricula = tbestudiante.idestudiante where tbestudiante.cedula = $1",
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

  async eliminar(req, res) {
    var id = req.params.Id;
    const query = {
      text: "DELETE FROM tbmatricula WHERE idmatricula = $1",
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
