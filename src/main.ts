import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

let server: Handler;

dotenv.config();

// if dev run on localhost
if (process.env.NODE_ENV !== 'production') {
  (async () => {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: (req, callback) => callback(null, true),
    });

    app.use(helmet());

    await app.listen(4000);
  })();
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });

  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
