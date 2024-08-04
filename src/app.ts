process.loadEnvFile()


const ve = process.env.PORT
console.log(ve)

import { envs } from "./config/plugins/env.plugins"
import { ServerApp } from "./presentacion/serverApp"


(async()=>{
  main()
})()




async function main(){
    // ServerApp.run();
    console.log(envs.MAILER_EMAIL)
}