import { EmailServices } from "../../../presentacion/email/email.services";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogUsecase {
    execute:(to:string | string[])=>Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogUsecase {
    constructor(
        private readonly emailService: EmailServices,
        private readonly logRepository: LogRepository
    ) {}
    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) throw new Error('Error sending email');
            const log = new LogEntity({
                message: `Email sent to ${to}`,
                level: LogSeverityLevel.low,
                origin: 'send-email-log.ts'
            });
            this.logRepository.saveLog(log)
            return true;
    }catch(error){
        const log = new LogEntity({
            message: `Email not sent`,
            level: LogSeverityLevel.high,
            origin: 'send-email-log.ts'
        });
        this.logRepository.saveLog(log)
        return false
    }
}
}