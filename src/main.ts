import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './utils/custom-logger';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(new CustomLogger());

  await app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
  });
}
bootstrap();
