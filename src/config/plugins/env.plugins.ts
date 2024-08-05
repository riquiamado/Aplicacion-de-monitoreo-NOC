process.loadEnvFile();

import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  SECET_EMAIL_KEY: env.get('SECET_EMAIL_KEY').required().asString(),
  PROD: env.get('PROD').required().asBool(),
  MAILER_SERVICES: env.get('MAILER_SERVICES').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),

  //Mongo
  

  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASS: env.get('MONGO_PASS').required().asString(),
  MONGO_URL: env.get('MONGO_URL').required().asUrlString(),

  //postgres db
  POSTGRES_URL: env.get('POSTGRES_URL').required().asUrlString(),
  POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
  POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
  POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString()
};
