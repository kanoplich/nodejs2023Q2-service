import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './utils/custom-logger';
import 'dotenv/config';
import { HttpExceptionFilter } from './utils/exception-filter';
import { access, constants, mkdir } from 'fs';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  access('logger', constants.F_OK, (err) => {
    if (err)
      mkdir('logger', { recursive: true }, (err) => {
        if (err) {
          console.error('Directory creation error: ', err);
        }
      });
  });

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(new CustomLogger());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
  });

  process
    .on('uncaughtException', (err) => {
      console.error('Uncaught exception', err);
      process.exit(1);
    })
    .on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at:', p, 'reason:', reason);
      process.exit(1);
    });
}
bootstrap();
