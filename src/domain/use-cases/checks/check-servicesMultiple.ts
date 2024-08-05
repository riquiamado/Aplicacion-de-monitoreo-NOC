import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class checkServicesMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly succesCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const logs = new LogEntity({
        message: `Service ${url} wroking`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      });
      this.callLogs(logs);
      this.succesCallback && this.succesCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const logs = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'
      });
      this.callLogs(logs);

      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
