import fs from "fs";
import path from "path";
import chalk, { ChalkInstance } from "chalk";

import { Funko } from "./funco.js";
import { Tipo } from "./tipo.js";
import { Genero } from "./genero.js";
import { FuncosCollection } from "./funkoCollection.js";

//test de usuario de la clase Funko
export const funko1 = new Funko(
  1,
  "Batman",
  "Funko de Batman",
  Tipo.VINYL_SODA,
  Genero.ANIMACION,
  "DC Comics",
  1,
  true,
  "Edicion FlashPoint",
  50
);

export const funko2 = new Funko(
  2,
  "Superman",
  "Funko de Superman",
  Tipo.VINYL_SODA,
  Genero.ANIMACION,
  "DC Comics",
  2,
  true,
  "Edicion FlashPoint",
  100
);

export const funko3 = new Funko(
  3,
  "Joker",
  "Funko de Joker",
  Tipo.VINYL_SODA,
  Genero.ANIMACION,
  "DC Comics",
  3,
  true,
  "Edicion FlashPoint",
  150
);

export const funko4 = new Funko(
  4,
  "Flash",
  "Funko de Flash",
  Tipo.VINYL_SODA,
  Genero.ANIMACION,
  "DC Comics",
  4,
  true,
  "Edicion FlashPoint",
  201
);

//test de usuario de la clase FuncosCollection
export const listaFunkos = [funko1, funko2];
export const listaFunkos2 = [funko3, funko4];
export const listaFunkos3 = [funko1, funko2, funko3, funko4];
export const listaFunkos4 = [funko1, funko2, funko3, funko4];

// new FuncosCollection().almacenarFunkoUsuario(funko1, "Jorge");
// new FuncosCollection().almacenarFunkoUsuario(funko2, "Jorge");
// new FuncosCollection().almacenarFunkoUsuario(funko3, "Jorge");
// new FuncosCollection().almacenarFunkoUsuario(funko4, "Jorge");

// new FuncosCollection().almacenarFunkoUsuario(funko3, "sara");
// new FuncosCollection().almacenarFunkoUsuario(funko4, "sara");
