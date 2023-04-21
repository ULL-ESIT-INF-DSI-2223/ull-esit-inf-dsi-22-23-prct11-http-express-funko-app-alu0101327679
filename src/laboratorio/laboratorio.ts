import { spawn } from 'child_process'
import express from 'express'
import { Server } from 'http'

export class servidor{
  private servidor: Server = new Server

  private aplicacion: express.Application = express()
  constructor(){
    this.aplicacion.get('/execmd', this.ejecutar)
    this.aplicacion.get('*', this.error)
  }

  public encender(port:number){
    this.servidor = this.aplicacion.listen(port, () => {
      console.log(`Servidor Web escuchando puerto ${port}`)
    })
  }

  public apagar(){
    this.servidor.close()
  }

  private ejecutar = (requerimiento: express.Request, respuesta: express.Response) => {
    const cmd = requerimiento.query.cmd as string
    let args: string[] = []
    if(requerimiento.query.args != undefined){
      args = (requerimiento.query.args as string).split(/\s+/) //exp reg para separar por 1 o más espacios
    }
    console.log(`comando: ${cmd} ${args}`)

    const comando = spawn(cmd, args) // ejecuta el comando
    let output: string = ''
    // let type: string = 'error'
    // let error: string = ''

    comando.on('error', (salida) => { // error por defecto, el comando no se ejecuta
      output += salida
      // respuesta.status(500).send()
    })

    comando.stderr.on('data', (salida) => { // error secundario, error en caso de ejecutar pero no ser capaz de manejar los argumentos
      output += salida
      // respuesta.status(500).send()
    })

    comando.stdout.on('data', (salida) => { // se ejecuta de forma correcta
      output += salida
      // type = 'output'
    })

    comando.on('close' , (code) => { // se cierra la llamada
      console.log(`Codigo de salida: ${code}`)

      if(code != 0){
        respuesta.status(500).send({error: output})
      }else {
        respuesta.send({output: output})
      }
    })

  }

  private error = (requerimiento: express.Request, respuesta: express.Response) => {
    respuesta.status(400).send() // devuelve un error 400 al servidor
  }

}
new servidor().encender(3000)