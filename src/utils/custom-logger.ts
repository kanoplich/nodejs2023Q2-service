import { LoggerService } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export class CustomLogger implements LoggerService {
  log(message: string, context: string) {
    const text = `[Nest] ${
      process.pid
    } - ${new Date().toLocaleString()} LOG [${context}] ${message}`;

    this.writeFileLogs(text);
    console.log(text);
  }
  error(message: string, context: string) {
    const text = `[Nest] ${
      process.pid
    } - ${new Date().toLocaleString()} ERROR [${context}] ${message}`;

    this.writeFileLogs(text);
    this.writeFileErrors(text);

    console.log(text);
  }
  warn(message: string, context: string) {
    const text = `[Nest] ${
      process.pid
    } - ${new Date().toLocaleString()} WARN [${context}] ${message}`;

    this.writeFileLogs(text);
    console.log(text);
  }
  debug?(message: string, context: string) {
    const text = `[Nest] ${
      process.pid
    } - ${new Date().toLocaleString()} DEBUG [${context}] ${message}`;

    this.writeFileLogs(text);
    console.log(text);
  }
  verbose?(message: string, context: string) {
    const text = `[Nest] ${
      process.pid
    } - ${new Date().toLocaleString()} VERBOSE [${context}] ${message}`;

    this.writeFileLogs(text);
    console.log(text);
  }

  private async writeFileLogs(log: string) {
    const pathToLog = join('logger', 'logs.txt');
    await writeFile(pathToLog, `${log}\n`, { flag: 'a' });
  }

  private async writeFileErrors(error: string) {
    const pathToLog = join('logger', 'errors.txt');
    await writeFile(pathToLog, `${error}\n`, { flag: 'a' });
  }
}
