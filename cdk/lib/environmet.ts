import 'dotenv/config';

export const environment = {
  DATABASE_HOST: process.env.DATABASE_HOST as string,
  DATABASE_PORT: process.env.DATABASE_PORT as string,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
};
