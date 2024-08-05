export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;
  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }
  static fromJson(json: string): LogEntity {
    const { level, message, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({ level, message, origin, createdAt });
    return log;
  }

  static fromObject(object: {[key:string]:any}): LogEntity {
    const { level, message, origin, createdAt } = object;
    const log = new LogEntity({
      level, message, origin, createdAt 
    });
    return log;
  }
}
