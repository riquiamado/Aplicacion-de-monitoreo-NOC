import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class checkServices implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }
  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const logs = new LogEntity(`Service ${url} wroking`,LogSeverityLevel.low)
      this.logRepository.saveLog(logs)
       this.succesCallback && this.succesCallback()
      return true;
    } catch (error) {
        const errorMessage = `${error}`
        const logs = new LogEntity(`${errorMessage}`,LogSeverityLevel.high)
        this.logRepository.saveLog(logs)
       this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
