[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101327679/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101327679?branch=main)[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101327679&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101327679)[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101327679&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101327679)

# Tareas previas

- Peparar el entorno virtual para que contenga:

  1. [TyeDoc](https://typedoc.org)
  2. [Mocha](https://mochajs.org)
  3. [Chai](https://www.chaijs.com)
  4. Prettier
  5. eslint
  6. [Instanbull](https://istanbul.js.org/)
  7. [Coveralls](https://coveralls.io/)
  8. [Prompt-sync](https://www.npmjs.com/package/prompt-sync)
     - `npm i prompt-sync`
     - `npm i --save-dev @types/prompt-sync`
  9. [Yargs](https://www.npmjs.com/package/yargs)
  10. [Chalks](https://www.npmjs.com/package/chalk)
  11. GitHub Actions
      - Pages
      - Coveralls
      - SonarCloud
  12. Entender un poco el [API sincrona de Node.js](https://nodejs.org/docs/latest-v19.x/api/fs.html)

- Repasar las ["Markdown Basics"](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links)
- Tener a mano los [apuntes](https://ull-esit-inf-dsi-2223.github.io/typescript-theory/) principales de la asignatura
- Y los [apuntes](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/) de Node.js
- Tener a mano el [guion de la practica](https://ull-esit-inf-dsi-2223.github.io/prct05-objects-classes-interfaces/)


# Main
El programa principal que desarrollaremos se basa en el desarrollo de un sistema sincrono que nos permita interactuar con los funkos de los usuarios del sistema, los usuarios serán identificados por los diferentes directorios donde se guardan los funkos, y a su vez, los diferentes funkos se guardan en ficheros JSON, donde el nombre del fichero será el ID del funko alamcenado.

En este caso se obtendría un arbol de directorios con esta forma luego de haber generado funkos para varios usuarios:

![arbol de directorios](./images/Screenshot_15.png)

Las funciones que debemos implementar son:

  ## Añadir funko.
```ts
  public almacenarFunkoUsuario(funko: Funko, usuario: string) {
    const fileName = funko.id + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;
  
    if (fs.existsSync(filePath)) {
      console.log(chalk.bold.red(`Ya existe un Funko con el nombre ${funko.nombre} en el directorio ${dirName}`));
      return;
    }
  
    fs.mkdirSync(`./funkos/${dirName}`, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(funko));
    console.log(chalk.green.bold(`El Funko "${funko.nombre}" fue almacenado correctamente.`));
  }
```
Este código es una función escrita en TypeScript  que almacena información sobre un Funko en un archivo JSON dentro de un directorio específico en el sistema de archivos.

La función toma dos argumentos: el objeto Funko que contiene la información sobre el Funko que se va a almacenar y el nombre del usuario que posee el Funko.

Primero, se construye el nombre del archivo utilizando el ID del Funko y la extensión ".json". Luego, se crea un nombre de directorio utilizando el nombre del usuario proporcionado en minúsculas y con espacios en blanco reemplazados por guiones ("-"). El directorio se crea si no existe ya.

La función luego verifica si el archivo ya existe en el directorio especificado usando la función fs.existsSync(). Si el archivo ya existe, la función devuelve un mensaje de error y no continúa. De lo contrario, se escribe el archivo JSON en la ubicación especificada utilizando fs.writeFileSync(). Finalmente, se imprime un mensaje de éxito en la consola.

  ## Modificar Funko

```ts
  public modificarFunkoUsuario(id: number, nuevoFunko: Funko, usuario: string) {
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${id.toString()}.json`;

    if (fs.existsSync(filePath)) {
      const nuevoContenido = JSON.stringify(nuevoFunko);
      fs.writeFileSync(filePath, nuevoContenido, "utf8");
      console.log(
        chalk.bold.green(`El Funko "${id.toString()}" ha sido modificado exitosamente.`)
      );
    } else {
      console.log(chalk.bold.red(`No se encontró el archivo del Funko "${id.toString()}".`));
    }
  }
```

La función toma tres argumentos: el ID del Funko que se va a modificar, el objeto Funko que contiene la nueva información que se utilizará para actualizar el archivo JSON y el nombre de usuario que posee el Funko.

En primer lugar, la función construye la ruta al archivo utilizando el ID del Funko, el nombre de usuario y el directorio donde se almacenan los archivos JSON. El nombre de usuario se normaliza a minúsculas y con espacios en blanco reemplazados por guiones ("-").

A continuación, se verifica si el archivo existe en la ruta especificada utilizando la función fs.existsSync(). Si el archivo existe, se sobrescribe con el nuevo contenido utilizando la función fs.writeFileSync(). El nuevo contenido es el objeto Funko serializado a JSON utilizando la función JSON.stringify(). Finalmente, se imprime un mensaje de éxito en la consola utilizando la biblioteca chalk.

Si el archivo no existe en la ruta especificada, se imprime un mensaje de error en la consola utilizando chalk.

Cabe destacar que este código hace uso de las bibliotecas Node.js fs y chalk. La primera se utiliza para interactuar con el sistema de archivos y la segunda para agregar colores y estilos a los mensajes de la consola.

## Eliminar funko

```ts
  public eliminarFunkoUsuario(id: number, usuario: string) {
    const fileName = id.toString() + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    try {
      fs.unlinkSync(filePath);
      console.log(chalk.green.bold(`El Funko "${id}" fue eliminado correctamente.`));
      return true
    } catch (error) {
      console.error(chalk.red.bold(`Error al intentar eliminar el Funko "${id}"`));
      return false
    }
  }
```

Este es un método que elimina un archivo JSON que contiene información sobre un Funko en un directorio específico del sistema de archivos.

La función toma dos argumentos: el ID del Funko que se va a eliminar y el nombre de usuario que posee el Funko.

En primer lugar, la función construye la ruta al archivo utilizando el ID del Funko, el nombre de usuario y el directorio donde se almacenan los archivos JSON. El nombre de usuario se normaliza a minúsculas y con espacios en blanco reemplazados por guiones ("-").

A continuación, se intenta eliminar el archivo utilizando la función fs.unlinkSync(). Si el archivo se elimina correctamente, se imprime un mensaje de éxito en la consola utilizando la biblioteca chalk y la función devuelve true. De lo contrario, se imprime un mensaje de error en la consola y la función devuelve false.

Cabe destacar que este código utiliza un bloque try-catch para manejar cualquier error que pueda ocurrir al intentar eliminar el archivo.

## Listar elemento

```ts
  public listarFunkosUsuario(usuario: string) {
    const valorMinimo = 0;
    const valorBajo = 50;
    const valorMedio = 100;
    const valorAlto = 500;
  
    console.log(chalk.bold("Funkos existentes:"));
    let funkos = this.cargarFunkosUsuario(usuario);
  
    if (funkos.length === 0) {
      console.log(chalk.bold.red("No se encontraron funkos para el usuario: " + usuario));
      return false
    }
  
    for (const funko of funkos) {
      const valor = funko.valorDeMercado;
  
      let valorColoreado: string;
  
      if (valor >= 200) {
        valorColoreado = chalk.green.bold(valor.toFixed(2));
      } else if (valor >= 150) {
        valorColoreado = chalk.yellow.bold(valor.toFixed(2));
      } else if (valor >= 100) {
        valorColoreado = chalk.blue.bold(valor.toFixed(2));
      } else {
        valorColoreado = chalk.red.bold(valor.toFixed(2));
      }
  
      console.log(
        chalk.bold.magenta(funko.nombre) +
          " - Valor de mercado: " +
          valorColoreado
      );
    }
    return true
  }
```

Este método es responsable de listar los Funkos almacenados en el sistema de archivos para un usuario en particular y muestra información sobre cada uno de ellos en la consola.

La función toma un argumento, que es el nombre de usuario del que se listarán los Funkos.

En primer lugar, la función define cuatro variables de valor mínimo, bajo, medio y alto para utilizar más adelante para resaltar el valor de mercado de cada Funko. A continuación, se carga la lista de Funkos para el usuario especificado mediante la llamada a la función cargarFunkosUsuario().

Si la lista de Funkos está vacía, la función imprime un mensaje en la consola que indica que no se encontraron Funkos para el usuario especificado y devuelve false.

De lo contrario, la función itera sobre cada uno de los Funkos de la lista y para cada uno de ellos, se compara su valor de mercado con los valores mínimo, bajo, medio y alto definidos anteriormente. En función de este valor, se le asigna un color específico utilizando la biblioteca chalk.

Luego, se muestra el nombre del Funko y su valor de mercado en la consola, resaltando este último con el color asignado anteriormente.

Finalmente, la función devuelve true.

## Mostrar Funko

```ts
public mostrarFunkoUsuario(id: number, usuario: string): boolean{
    const fileName = `${id}.json`;
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    try {
      const data = fs.readFileSync(filePath, "utf8");
      const foundFunko = JSON.parse(data);
      console.log(chalk.magenta.bold(`Información del Funko con ID ${id}:`));
      console.log(`Nombre: ${foundFunko.nombre}`);
      console.log(`Descripción: ${foundFunko.descripcion}`);
      console.log(`Tipo: ${foundFunko.tipo}`);
      console.log(`Género: ${foundFunko.genero}`);
      console.log(`Franquicia: ${foundFunko.franquicia}`);
      console.log(`Número: ${foundFunko.numero}`);
      console.log(`Exclusivo: ${foundFunko.exclusivo ? "Sí" : "No"}`);
      console.log(
        `Características especiales: ${foundFunko.caracteristicasEspeciales}`
      );

      const valor = foundFunko.valorDeMercado;
      let color: ChalkInstance;
      if (valor > 200) {
        color = chalk.green;
      } else if (valor >= 150) {
        color = chalk.yellow;
      } else if (valor >= 100) {
        color = chalk.blue;
      } else {
        color = chalk.red;
      }
      console.log(`Valor de mercado: ${color.bold(`$${valor.toFixed(2)}`)}`);
      return true
    } catch (err) {
      console.log(chalk.red(`No existe un Funko con ID ${id} en la lista.`));
      return false
    }
  }
```
Este código define un método llamado mostrarFunkoUsuario que recibe dos parámetros: id, un número que representa el identificador del Funko que se desea mostrar, y usuario, una cadena de texto que indica el usuario propietario del Funko.

El método comienza construyendo la ruta al archivo JSON correspondiente al Funko utilizando el id y el usuario. Luego, se utiliza la función readFileSync del módulo fs para leer el contenido del archivo y se almacena en la variable data.

Después, el método analiza el contenido de data utilizando la función JSON.parse para convertirlo en un objeto JSON. A continuación, se muestra información detallada sobre el Funko utilizando la función console.log, incluyendo el nombre, descripción, tipo, género, franquicia, número, si es exclusivo o no, y las características especiales del Funko.

Finalmente, se muestra el valor de mercado del Funko, que se determina utilizando una serie de condiciones. Si el valor de mercado es mayor a 200, el texto se muestra en verde; si está entre 150 y 200, se muestra en amarillo; si está entre 100 y 150, se muestra en azul; y si es menor a 100, se muestra en rojo.

Si se produce un error al intentar leer el archivo del Funko, se muestra un mensaje indicando que no existe un Funko con el id especificado en la lista, y el método devuelve false. En caso contrario, el método devuelve true.

# API síncrona de Node.js

Hasta ahora ha sido "sencillo", puesto que no se ha encontrado dificultades que retrasaran demasiado el proyecto.

De ahora en adelante se utilizará la librería yargs para la creación de comandos personalizados con el objetivo de poder manejar los funkos de los diferentes usuarios mediante terminal.

## Mostrar

```ts
  .command(
    "mostrar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      new FuncosCollection().mostrarFunkoUsuario(argv.id, argv.usuario);
    }
  )
```
El comando mostrar requiere dos argumentos: usuario y id. El argumento usuario especifica el propietario del Funko que se desea mostrar, y el argumento id especifica el ID del Funko en cuestión.

El tercer argumento del método command es una función de callback que se ejecutará cuando se invoque el comando. Esta función instancia una nueva colección de Funkos y llama al método mostrarFunkoUsuario de esa colección, pasándole los valores de usuario e id como argumentos.

En resumen, este código define un comando mostrar que muestra la información de un Funko específico, y utiliza la colección de Funkos definida en el archivo para obtener la información.

## Listar

```ts
.command(
    "listar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      new FuncosCollection().listarFunkosUsuario(argv.usuario);
    }
  )

```
 El comando se llama "listar" y permite mostrar información de los Funkos de un usuario específico. El comando tiene un argumento "usuario" que es obligatorio y debe ser de tipo "string". Cuando se ejecuta el comando, se llama al método "listarFunkosUsuario" de la clase "FuncosCollection" para mostrar la información de los Funkos del usuario especificado.

 ## Modificar

 ```ts
 .command(
    "modificar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demand: true,
      },
      nombre: {
        description: "Nombre del Funko",
        type: "string",
        demandOption: true,
      },
      descripcion: {
        description: "Descripción del Funko",
        type: "string",
        demandOption: true,
      },
      tipo: {
        description: "Tipo del Funko",
        type: "string",
        choices: Object.values(Tipo),
        demandOption: true,
      },
      genero: {
        description: "Género del Funko",
        type: "string",
        choices: Object.values(Genero),
        demandOption: true,
      },
      franquicia: {
        description: "Franquicia del Funko",
        type: "string",
        demandOption: true,
      },
      numero: {
        description: "Número del Funko",
        type: "number",
        demandOption: true,
      },
      exclusivo: {
        description: "¿Es exclusivo?",
        type: "boolean",
        default: false,
      },
      caracteristicasEspeciales: {
        description: "Características especiales del Funko",
        type: "string",
        demandOption: true,
      },
      valorDeMercado: {
        description: "Valor de mercado del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      new FuncosCollection().modificarFunkoUsuario(
        argv.id,
        new Funko(
          argv.id,
          argv.nombre,
          argv.descripcion,
          argv.tipo,
          argv.genero,
          argv.franquicia,
          argv.numero,
          argv.exclusivo,
          argv.caracteristicasEspeciales,
          argv.valorDeMercado
        ),
        argv.usuario
      );
    }
  )
 ```

 Cuando el comando se ejecuta, se llama a la función modificarFunkoUsuario() en la instancia de la clase FuncosCollection, que toma los argumentos proporcionados para actualizar la información del Funko en la colección del usuario correspondiente. La función toma el ID del Funko a modificar, un objeto Funko con las nuevas propiedades del Funko, y el nombre del propietario del Funko como argumentos.

 ## Eliminar

 ```ts
 .command(
    "eliminar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      new FuncosCollection().eliminarFunkoUsuario(argv.id, argv.usuario);
    }
  )
 ```

Cuando se ejecuta el comando "eliminar" con los argumentos "usuario" e "id", el programa crea una instancia de la clase FuncosCollection y llama a su método eliminarFunkoUsuario, pasándole como argumentos el ID del Funko y el nombre del usuario. Este método busca el Funko con el ID proporcionado en la colección de ese usuario y lo elimina.

 ## Añadir
  ```ts
  .command(
    "add",
    "Añadir un nuevo Funko a la lista",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demand: true,
      },
      nombre: {
        description: "Nombre del Funko",
        type: "string",
        demandOption: true,
      },
      descripcion: {
        description: "Descripción del Funko",
        type: "string",
        demandOption: true,
      },
      tipo: {
        description: "Tipo del Funko",
        type: "string",
        choices: Object.values(Tipo),
        demandOption: true,
      },
      genero: {
        description: "Género del Funko",
        type: "string",
        choices: Object.values(Genero),
        demandOption: true,
      },
      franquicia: {
        description: "Franquicia del Funko",
        type: "string",
        demandOption: true,
      },
      numero: {
        description: "Número del Funko",
        type: "number",
        demandOption: true,
      },
      exclusivo: {
        description: "¿Es exclusivo?",
        type: "boolean",
        default: false,
      },
      caracteristicasEspeciales: {
        description: "Características especiales del Funko",
        type: "string",
        demandOption: true,
      },
      valorDeMercado: {
        description: "Valor de mercado del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const nuevoFunko = new Funko(
        argv.id,
        argv.nombre,
        argv.descripcion,
        argv.tipo,
        argv.genero,
        argv.franquicia,
        argv.numero,
        argv.exclusivo,
        argv.caracteristicasEspeciales,
        argv.valorDeMercado
      );
      new FuncosCollection().almacenarFunkoUsuario(nuevoFunko, argv.usuario);
    }
  )
 ```
La función que se ejecuta cuando se llama al comando "add" toma los valores de estas opciones y los usa para crear un nuevo objeto Funko utilizando la clase Funko que se ha definido en otra parte del código. A continuación, el objeto Funko se almacena en la colección de Funkos del usuario utilizando el método almacenarFunkoUsuario() de la clase FuncosCollection.

En resumen, este código define un comando que permite a los usuarios agregar nuevos Funkos a su colección utilizando una serie de opciones para proporcionar detalles sobre el Funko que se está agregando.

# Modificacion

En mi caso no pude completar la modificación en horario de clase, pero añadiré lo que obtuve luego de tener un poco de tiempo extra para plantearme una solución.

En este caso tenemos una clase plantilla, registro, de la cual son extendidas RegistroJson y registroCSV, las cuales se encargan de leer ficheros en formato JSON y CSV respectivamente.

### Registro CSV
```ts
export class RegistroCSV extends Registro {

  constructor(Bolsa: Bolsa){
    super(Bolsa)
  }

  protected pocesar(): void {
    readFile('formato_csv.csv', (err, data) => {
      if (err) {
        console.log('There must be a problem with the file you are trying to read');
      } else {
        this.datos = data.toString()  
        let datos = this.datos.split("\n")
        let capacidad = datos[0].split(" ")
        this.bolsa.capacidad = parseInt(capacidad[0])
        this.bolsa.n_elementos = parseInt(datos[1])
        for (let i = 2; i < datos.length; i++) {
          let elemento = datos[i].split(" ")
          let peso = parseInt(elemento[0])
          let valor = parseInt(elemento[1])
          this.bolsa.elementos.push({peso, valor})
        }
      }
    });
  }
}
```
La clase tiene un método protegido llamado procesar() que se encarga de procesar un archivo CSV. En el método se llama a la función readFile() de Node.js para leer el archivo CSV llamado formato_csv.csv. Si hay un error al leer el archivo, se imprime un mensaje en la consola. Si la lectura del archivo se realiza correctamente, se asigna el contenido del archivo a la propiedad datos de la clase.

Luego, se divide el contenido del archivo en líneas utilizando el carácter de salto de línea (\n). En la primera línea se encuentra la capacidad de la bolsa y en la segunda línea se encuentra el número de elementos que se van a procesar. A partir de la tercera línea se encuentran los elementos de la bolsa, donde cada elemento tiene un peso y un valor separados por un espacio.

En el bucle for se recorren las líneas de los elementos de la bolsa y se divide cada línea en sus componentes de peso y valor. Luego se agregan los elementos a la propiedad elementos de la bolsa, que es un array de objetos con las propiedades peso y valor.

Este método se utiliza para leer un archivo CSV y asignar los datos de la bolsa al objeto Bolsa que se pasó al constructor de la clase RegistroCSV.
### Registro JSON

```ts
export class RegistroJSON extends Registro {

  /**
   * constructor de la clase RegistroJSON
   * @param Bolsa  bolsa de la que se va a leer el fichero
   */
  constructor(Bolsa: Bolsa){
    super(Bolsa)
  }

  /**
   * metodo que procesa el fichero JSON
   */
  protected pocesar(): void {
    readFile('formato_JSON.json', (err, data) => {
      if (err) {
        console.log('There must be a problem with the file you are trying to read');
      } else {
        this.datos = data.toString()  
        this.bolsa = JSON.parse(this.datos)
        // console.log(this.bolsa)
      }
    });
  }
}

```
En la clase RegistroJSON, se define un constructor que recibe un objeto Bolsa como parámetro y llama al constructor de la clase Registro pasando el mismo objeto como parámetro. Luego se define un método procesar() que lee el contenido de un archivo llamado formato_JSON.json utilizando la función readFile de Node.js. Si no hay errores al leer el archivo, el contenido se almacena en la propiedad datos de la instancia de la clase RegistroJSON. Después, se utiliza el método JSON.parse para analizar el contenido de datos y convertirlo en un objeto que se asigna a la propiedad bolsa.


