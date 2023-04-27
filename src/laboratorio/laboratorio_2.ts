import { MongoClient, ObjectId } from "mongodb";
import { Funko } from "./../servidor/funkos/funco.js";
import { Tipo } from "./../servidor/funkos/tipo.js";
import { Genero } from "./../servidor/funkos/genero.js";
import { resourceUsage } from "process";
import { funko1 } from "./../servidor/funkos/main.js";

export class clienteMongo {
  dbURL = "mongodb://127.0.0.1:27017";

  constructor() {}

  add(item: Funko, username: string) {
    MongoClient.connect(this.dbURL)
      .then((client) => {
        const db = client.db(username);

        return db.collection<Funko>("Funkos").insertOne(item);
      })
      .then((result) => {
        console.log(result.acknowledged);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mostrar(username: string, id: string) {
    MongoClient.connect(this.dbURL)
      .then((client) => {
        const db = client.db(username);
        return db
          .collection<Funko>("Funkos")
          .findOne({ _id: new ObjectId(id) });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listar(username: string) {
    MongoClient.connect(this.dbURL)
      .then((client) => {
        const db = client.db(username);
        return db.collection<Funko>("Funkos").find().toArray();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(username: string, item: Funko, id: string) {
    MongoClient.connect(this.dbURL)
      .then((client) => {
        const db = client.db(username);
        return db.collection<Funko>("Funkos").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              id: item.id,
              nombre: item.nombre,
              descripcion: item.descripcion,
              tipo: item.tipo,
              genero: item.genero,
              franquicia: item.franquicia,
              numero: item.numero,
              exclusivo: item.exclusivo,
              caracteristicasEspeciales: item.caracteristicasEspeciales,
              valorDeMercado: item.valorDeMercado,
            },
          }
        ); // posible explotacion
      })
      .then((result) => {
        console.log(result.acknowledged);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delete(name: string, username: string, ) {
    MongoClient.connect(this.dbURL).then((client) => {
      const db = client.db(username)

      return db.collection<Funko>('Funkos').deleteOne({
        nombre: name
      })
    }).then((result) => {
      console.log(result.acknowledged)
    }).catch((error) => {
      console.log(error)
    })
  }
}
