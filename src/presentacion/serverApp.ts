import { checkServices } from '../domain/use-cases/checks/check-services';
import { checkServicesMultiple } from '../domain/use-cases/checks/check-servicesMultiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { fileSystemDatasource } from '../infrastructure/datasource/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasource/mongoLog.datasource';
import { postgresLogDatasource } from '../infrastructure/datasource/postgresLog.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cronService';
import { EmailServices } from './email/email.services';

const fsLogRepository = new LogRepositoryImpl(
  new fileSystemDatasource()
  // new MongoLogDatasource()
);
const mongoLogRepistory = new LogRepositoryImpl(new MongoLogDatasource());
const postgreLogRepository = new LogRepositoryImpl(new postgresLogDatasource());

const emailServices = new EmailServices();

export class ServerApp {
  constructor() {}

  public static run() {
    console.log('Server is running');

    // TODO mandar email
    // new SendEmailLogs(
    //   emailServices,
    //   fileSystemLogRepository
    // ).execute(['carlosamadodev@gmail.com','gladycoronel901@gmail.com'])

    //   emailServices.sendEmailWithFileSystemLogs(
    //     ['carlosamadodev@gmail.com','gladycoronel901@gmail.com']

    // )

  //   CronService.createJob('*/5 * * * * *', () => {
  //     const url = 'https://google.com';
  //     new checkServicesMultiple(
  //       [fsLogRepository, mongoLogRepistory, postgreLogRepository],
  //       () => {
  //         console.log(`${url} is ok`);
  //       },
  //       () => {
  //         console.log(`${url} is not ok`);
  //       }
  //     ).execute(url);
  //   });
  }
}

/*
.sendEmailWithFileSystemLogs(
      ['carlosamadodev@gmail.com','gladycoronel901@gmail.com']
      
  )
{
  to:'carlosamadodev@gmail.com',
  subject:'Test email',
  htmlBody:`
  <h3>Log de sistemas - <strong>NOC</strong></h3>
  <p>Tengo hambre vivo con hambre</p>
  <p>Aguante boca la puta madre</p>
  
  `
}
  */
