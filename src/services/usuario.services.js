const jsonwebtoken = require("jsonwebtoken");
const { Client } = require("../config/dbconection");

class UsuarioService {
  async crear(req, res) {
    try {
      const { nombresc, usuario, clave } = req.body;
      const query = {
        text: "INSERT INTO tbusuario (nombresc, usuario, clave) VALUES ($1, $2, $3)",
        values: [`${nombresc}`, `${usuario}`, `${clave}`],
      };
      await Client().query(query, (err, result) => {
        console.log(err);
        if (err) {
          res.status(500).send({ message: "Error al crear usuario" });
        } else {
          res.status(200).send({ message: "Canton creado" });
        }
      });
    } catch (error) {
      res.status(404).send({ message: "variables incorrrectas" });
    }
  }

  async editar(req, res) {
    const { nombresc, usuario, clave } = req.body;
    var id = req.params.userId;
    var validate =
      nombresc === undefined ||
      usuario === undefined ||
      clave === undefined ||
      id === undefined
        ? false
        : true;
    const query = {
      text: "UPDATE tbusuario SET nombresc = $1, usuario = $2, clave = $3 where idusuario = $4",
      values: [`${nombresc}`, `${usuario}`, `${clave}`, `${id}`],
    };
    try {
      if (validate) {
        await Client().query(query, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Error al editar usuario",
            });
          } else {
            res.status(200).send({
              message: "Usuario editado",
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
    await Client().query("SELECT * FROM tbusuario", (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Error al listar usuarios",
        });
      } else {
        res.status(200).json({
          message: "Lista de usuarios",
          data: result.rows,
        });
      }
    });
  }

  ///verificamos si exicte el usuario
  async verifica(req, res) {
    try {
      const { usuario, clave } = req.body;
      const query = {
        text: "SELECT usuario, nombresc FROM tbusuario WHERE usuario=$1 AND clave=$2",
        values: [`${usuario}`, `${clave}`],
      };
      await Client().query(query, (err, result) => {
        if (!err) {
          //console.log(rows);
          if (result.rows.length > 0) {
            let data = JSON.stringify(result.rows[0]);
            const token = jsonwebtoken.sign(data, "admin");
            res.json({ token });
          } else {
            res.json("Usuario o clave incorrecta");
          }
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      res.status(404).send({ message: "variables incorrrectas" });
    }
  }

  //verificar si existe el token
  async test(req, res) {
    console.log(req.data); //*para crear las validaciones de los roles de los usuarios
    res.json("informacion secreta");
  }

  async eliminar(req, res) {
    var id = req.params.userId;
    const query = {
      text: "DELETE FROM tbusuario WHERE idusuario = $1",
      values: [`${id}`],
    };
    var validate = id === undefined ? false : true;
    try {
      if (validate) {
        await Client().query(query, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Error al eliminar usuario",
            });
          } else {
            res.status(200).send({
              message: "Usuario eliminado",
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
module.exports = UsuarioService;
