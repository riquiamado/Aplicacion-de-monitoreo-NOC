import { checkServices } from "../domain/use-cases/checks/check-services";
import { CronService } from "./cron/cronService";


export class ServerApp {
  constructor() {}

  public static run(): void {
    console.log('Server is running');
    CronService.createJob(
        '*/5 * * * * *',
        ()=>{
            const url = 'https://google.com';
           new checkServices(
            ()=>{console.log(`${url} is ok`)},
            ()=>{console.log(`${url} is not ok`)}
           ).execute(url);
        }
    )
  }
}
