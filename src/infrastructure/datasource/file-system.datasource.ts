import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity';

export class fileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly meiumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high-log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.allLogsPath, this.meiumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      }
    );
  };
   async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath,logAsJson);
    if(newLog.level === LogSeverityLevel.low) return;
    if(newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.meiumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }


    private getLogsFiles =(path:string):LogEntity[]=>{
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(LogEntity.fromJson);
        return logs;
    }

 async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
        case LogSeverityLevel.high:
            return this.getLogsFiles(this.highLogsPath);
        case LogSeverityLevel.medium:
            return this.getLogsFiles(this.meiumLogsPath);
        case LogSeverityLevel.low:
            return this.getLogsFiles(this.allLogsPath);   
          
        default:
            throw new Error(`Unsupported severity level: ${severityLevel}`);
    }
  }
}
