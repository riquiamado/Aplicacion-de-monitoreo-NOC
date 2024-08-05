process.loadEnvFile()




import { Prisma, PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/env.plugins"
import { LogModel, MongoDatabase } from "./data/mongodb"
import { ServerApp } from "./presentacion/serverApp"


(async()=>{
  main()
})()




async function main(){
  await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
  })

  // const prisma = new PrismaClient()

  // const newLog = await prisma.logModel.create({
  //   data:{
  //     level:'LOW',
  //     message:'Test message from prisma',
  //     origin:'serverApp.ts'
  //   }
  // })

  // const logs = await prisma.logModel.findMany()
  // console.log(logs)
  // console.log(newLog)

  //  const newLog = await LogModel.create({
  //       message:'Test message from mongo',
  //       origin:'serverApp.ts',
  //       level:'low'
  //   })
  //  await newLog.save()
  //  console.log(newLog)

  //  const logs = await LogModel.find()
  //  console.log(logs)

    ServerApp.run();
}