[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101327679/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101327679?branch=main)[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101327679&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101327679)[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101327679&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101327679)


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

En este caso hemos preparado un servidor HTTP que nos permite gestionar una colección de Funkos. Para ello hemos creado una clase `Funko` que representa un Funko, una clase `FunkoCollection` que representa una colección de Funkos y un servidor HTTP que nos permite gestionar dicha colección.

## Servidor HTTP

En este caso, hemos creado una clase para representar el servidor HTTP. Esta clase se llama `FunkoServer` y se encuentra en el fichero `src/servidor/server.ts`. En esta clase hemos definido las propiedades `servidor` y `aplicacion`, en este caso `servidor` es una instancia de laclase `Server`, que se utiliza para escuchar las solicitudes entrantes y enviar las respuestas. Por otro lado, `aplicacion` es una instancia de la clase `experess.Application`, que se utiliza para manejar las solicitudes HTTP entrantes y definir las rutas de la aplicación.

```typescript
  private servidor: Server = new Server();
  private aplicacion: express.Application = express();
```

En el constructor de la clase `FunkoServer` hemos definido las rutas de la aplicacion utilizando los metodos HTTP `get`, `post`, `delete` y `put` mediante la propiedad `aplicacion`y las funciones controladoras correspondientes. En este caso, hemos definido las siguientes rutas:

```typescript
constructor() {
  this.aplicacion.get("/funkos", this.mostrarListar);
  this.aplicacion.post("/funkos", this.add);
  this.aplicacion.delete("/funkos", this.eliminar);
  this.aplicacion.patch("/funkos", this.modificar);

  this.aplicacion.get("*", this.error);
  this.aplicacion.post("*", this.error);
  this.aplicacion.patch("*", this.error);
  this.aplicacion.delete("*", this.error);
}
```

Se han definido las rutas `"/funkos"` para las operaciones `GET`, `POST`, `DELETE` y `PATCH`. Además, se han definido las rutas `*` para las operaciones `GET`, `POST`, `PATCH` y `DELETE` para el caso de que se introduzca una ruta no definida. 

Cuando se utilice la operacion `GET` en la ruta `"/funkos"` se ejecutara la funcion controladora `mostrarListar`, cuando se utilice la operacion `POST` en la ruta `"/funkos"` se ejecutara la funcion controladora `add`, cuando se utilice la operacion `DELETE` en la ruta `"/funkos"` se ejecutara la funcion controladora `eliminar` y cuando se utilice la operacion `PATCH` en la ruta `"/funkos"` se ejecutara la funcion controladora `modificar`. Por otro lado, cuando se utilice cualquier operacion en cualquier ruta no definida se ejecutara la funcion controladora `error`.

### Funciones controladoras

#### Mostrar o listar

  La función comienza con una verificación de si se ha proporcionado el comando y si no se proporciona, se devuelve un error de solicitud incorrecta con el mensaje "No se ha introducido el comando". Si el comando es "mostrar", la función verifica si se ha proporcionado el usuario y el identificador (id) del Funko Pop. Si cualquiera de ellos falta, se devuelve un error de solicitud incorrecta correspondiente.A continuación, se crea una instancia de la clase "FuncosCollection" y se llama al método "cargarFunkosUsuario" para obtener todos los Funko Pops asociados con el usuario proporcionado en la solicitud.Luego, el código busca el Funko Pop específico que se ha solicitado mediante el método "find" en el arreglo "funkoPops" y, si se encuentra, se devuelve ese Funko Pop en la respuesta.Si el Funko Pop no se encuentra, se devuelve un error de recurso no encontrado con el mensaje "No se ha encontrado el recurso".Después de esto, se llama al método "guardarFunkosUsuario" para guardar cualquier cambio realizado en la lista de Funko Pops del usuario en particular.Si el comando es "listar", la función verifica si se ha proporcionado el usuario. Si no se proporciona, se devuelve un error de solicitud incorrecta con el mensaje "No se ha introducido el usuario".Se crea una instancia de la clase "FuncosCollection" y se llama al método "cargarFunkosUsuario" para obtener todos los Funko Pops asociados con el usuario proporcionado en la solicitud.Si no se encuentra ningún Funko Pop asociado con el usuario, se devuelve un error de recurso no encontrado con el mensaje "No se ha encontrado el recurso".De lo contrario, se devuelve una respuesta con la lista de Funko Pops del usuario.Finalmente, se llama al método "guardarFunkosUsuario" para guardar cualquier cambio realizado en la lista de Funko Pops del usuario en particular.

##### Añadir

  La función comienza validando que se han proporcionado todos los datos necesarios para crear un nuevo objeto "Funko". Si falta alguno de los datos, se envía una respuesta de error con un mensaje correspondiente.A continuación, se carga la colección de FunkoPops asociados al usuario proporcionado en la solicitud, y se busca si ya existe un Funko con el id proporcionado. Si existe, se envía una respuesta de error.Si no existe un Funko con el id proporcionado, se crea un nuevo objeto "Funko" con los datos proporcionados en la solicitud. Este objeto se agrega al array "funkoPops" y se guarda en la colección de FunkoPops asociados al usuario proporcionado en la solicitud.Finalmente, se envía una respuesta de éxito con el objeto Funko creado. La respuesta tiene un código de estado 200 y el cuerpo (body) de la respuesta contiene el objeto Funko.En resumen, esta función agrega un nuevo objeto Funko a la colección de FunkoPops asociados a un usuario en particular.

##### Eliminar

  El método comienza verificando si se proporcionó el usuario y el ID del recurso que se va a eliminar. Si alguno de ellos no se proporciona, se devuelve un error con un código de estado 400 y un mensaje correspondiente.A continuación, se carga la colección de FunkoPops del usuario utilizando la clase FuncosCollection y se almacenan en un array llamado "funkoPops". Se busca en la matriz el FunkoPop correspondiente al ID proporcionado y se almacena en la variable "funko".Si no se encuentra ningún FunkoPop con el ID proporcionado, se devuelve un error con un código de estado 400 y un mensaje correspondiente. En caso contrario, se elimina el FunkoPop del array "funkoPops" utilizando el método "filter" y se actualiza la colección de FunkoPops del usuario utilizando la clase FuncosCollection y el método "guardarFunkosUsuario".Finalmente, se devuelve una respuesta con un mensaje de éxito y un código de estado 200.

##### Modificar
  Verifica que se hayan proporcionado todos los campos necesarios en la solicitud HTTP. Si falta alguno, la función responde con un error HTTP 400 y un mensaje de error.Carga la colección de Funkos del usuario especificado en la solicitud HTTP.Busca el Funko con el ID especificado en la solicitud HTTP en la colección de Funkos.Si no se encuentra el Funko con el ID especificado, la función responde con un error HTTP 400 y un mensaje de error.Si se encuentra el Funko con el ID especificado, la función lo elimina de la colección de Funkos.Crea un nuevo objeto Funko con los valores especificados en la solicitud HTTP.Agrega el objeto Funko modificado a la colección de Funkos.Guarda la colección de Funkos modificada en la base de datos.Responde a la solicitud HTTP con un mensaje de éxito.

## Conclusiones

En este proyecto se ha podido comprobar que el uso de TypeScript es muy útil para el desarrollo de aplicaciones web, ya que permite crear aplicaciones web de forma más rápida y eficiente. Además, se ha podido comprobar que el uso de TypeScript permite crear aplicaciones web más seguras, ya que TypeScript permite definir tipos de datos para las variables y funciones, lo que permite que el código sea más fácil de entender y de mantener. Por otro lado, se ha podido comprobar que el uso de TypeScript permite crear aplicaciones web más escalables, ya que TypeScript permite crear clases y objetos, lo que permite que el código sea más fácil de reutilizar y de mantener.
