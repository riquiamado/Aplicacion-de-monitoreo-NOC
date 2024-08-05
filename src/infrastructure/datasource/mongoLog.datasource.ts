import { LogModel } from "../../data/mongodb";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


 export class MongoLogDatasource implements LogDatasource {
   async saveLog(log: LogEntity): Promise<void> {
       const newLogs = await LogModel.create(log)
       //await newLogs.save()
       console.log(newLogs)
    }
  async  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level:severityLevel
        })
        return logs.map(LogEntity.fromObject)
    }

}