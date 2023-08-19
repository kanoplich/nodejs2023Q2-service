import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLogger } from './custom-logger';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLogger();

  use(req: Request, res: Response, next: NextFunction): void {
    const { originalUrl, method, body, query } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      const message = `method: ${method}, url: ${originalUrl}, status: ${statusCode}, body: ${JSON.stringify(
        body,
      )}, query: ${JSON.stringify(query)}`;
      const context = req.url;

      if (statusCode < 400) {
        this.logger.log(message, context);
      } else {
        this.logger.error(message, context);
      }
    });

    next();
  }
}
