import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



interface SendmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailServices {

   
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICES,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  constructor(
  ) { }

  async sendMail(options: SendmailOptions) {
    const { to, subject, htmlBody, attachments: attachements = [] } = options;
    try {
       
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements
      });
      console.log('Email sent:', sentInformation);
      const log = new LogEntity({
        message: `Email sent to ${to}`,
        level: LogSeverityLevel.low,
        origin: 'email.services.ts'
      });
      return true;
    } catch (error) {
        const log = new LogEntity({
            message: `Email was not sent`,
            level: LogSeverityLevel.high,
            origin: 'email.services.ts'
          });
       
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>
            <p>Ver logs adjuntos</p>
            `;

    const attachements: Attachments[] = [
        { filename: 'logs-all.log', path:  './logs/logs-all.log'},
        { filename: 'logs-high.log', path:  './logs/logs-high.log' },
        { filename: 'logs-medium.log', path:  './logs/logs-medium.log' }
    ];
    console.log('Preparando para enviar email con adjuntos:', attachements);  
    const mails = await this.sendMail({
      to,
      subject,
      htmlBody,
      attachments: attachements
    });
    console.log(mails);

    return mails;
  }
}
