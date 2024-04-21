// utils/logging-service.ts

type LogLevel = 'error' | 'warn' | 'debug'

class Logger {
  static log(level: LogLevel, code: any, message: any[]) {
    const formattedMessage = `[${level.toUpperCase()}] [${code}] ${message.join(
      ' '
    )}`
    console.log(formattedMessage)
  }

  static error(code: Error, ...message: any[]) {
    this.log('error', code, message)
  }

  static warn(code: string, ...message: any[]) {
    this.log('warn', code, message)
  }

  static debug(code: string, ...message: any[]) {
    this.log('debug', code, message)
  }
}

export default Logger
