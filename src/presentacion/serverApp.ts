import { checkServices } from "../domain/use-cases/checks/check-services";
import { fileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cronService";


const fileSystemLogRepository = new LogRepositoryImpl(
  new fileSystemDatasource(),
)

export class ServerApp {
  constructor() {}

  public static run(): void {
    console.log('Server is running');
    CronService.createJob(
        '*/5 * * * * *',
        ()=>{
            const url = 'https://google.com';
           new checkServices(
            fileSystemLogRepository,
            ()=>{console.log(`${url} is ok`)},
            ()=>{console.log(`${url} is not ok`)}
           ).execute(url);
        }
    )
  }
}
