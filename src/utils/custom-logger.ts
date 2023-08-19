import { LoggerService } from '@nestjs/common';
import { writeFile } from 'fs/promises';

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
    await writeFile('logger/logs.txt', `${log}\n`, { flag: 'a' });
  }

  private async writeFileErrors(error: string) {
    await writeFile('logger/errors.txt', `${error}\n`, { flag: 'a' });
  }
}

/**/
