import { MongoClient, ObjectId } from "mongodb";
import { Funko } from "./../servidor/funkos/funco.js";
import { Tipo } from "./../servidor//funkos/tipo.js";
import { Genero } from "./../servidor//funkos/genero.js";
import { resourceUsage } from "process";
import { funko1, funko2, funko4 } from "./../servidor/funkos/main.js";
import { clienteMongo } from "./laboratorio_2.js";

let manager = new clienteMongo()

// manager.add(funko1, 'pepe') //funciona
// manager.add(funko2, 'pepe') // funcionan
// manager.mostrar('pepe', '644a3b5581fc224c819c925e') //funciona
// manager.listar('pepe') // funciona
// manager.delete('Batman', 'pepe') // funciona 
// manager.update('pepe', funko4, '644a3b5581fc224c819c925e') //funcionan