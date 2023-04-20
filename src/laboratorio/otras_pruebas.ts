import { spawn } from 'child_process'
import express from 'express'
import { Server } from 'http'


export class WebServer {
  //private server: Server = new Server

  private app: express.Application = express()

  public constructor() {
    this.app.get('/execmd', this.execmd)
    this.app.get('*', this.notFound)
  }

  public start(port: number) {
    /*this.server = */this.app.listen(port, () => {
      console.log(`WebServer listening on port ${port}`)
    })
  }

  /**
   * Stops the web server.
   * @public
   * @returns {void}
   * @example
   * ```typescript
   * const server = new WebServer();
   * server.start(3000);
   * server.stop();
   * ```
   */
  // public stop() {
  //   this.server.close()
  // }

  /**
   * Executes a command.
   * @param req Request of client
   * @param res Response to client
   * @private
   */
  private execmd = (req: express.Request, res: express.Response) => {
    const cmd = req.query.cmd as string
    let args: string[] = []
    if (req.query.args)
      args = (req.query.args as string).split(' ')
    console.log(`cmd: ${cmd}, args: ${args}`)

    // Execute command
    const command = spawn(cmd, args)
    let output = ''
    let type = 'error'

    // Get output in case of error because of wrong command
    command.on('error', (chunk) => {
      output += chunk
    })

    // Get output in case of error because of wrong arguments
    command.stderr.on('data', (chunk) => {
      output += chunk
    })

    // Get output in case of success
    command.stdout.on('data', (chunk) => {
      output += chunk
      type = 'output'
    })

    // Send output to client
    command.on('close', (code) => {
      console.log(`Exit code: ${code}\n`)
      res.json({ type, output })
    })
  }

  private notFound = (req: express.Request, res: express.Response) => {
    res.send('<h1>Error 404 - Not Found</h1>')
  }
}
// Test
new WebServer().start(3000)

//http://localhost:3000/execmd?cmd=ls&args=-tusmuertosacaballo