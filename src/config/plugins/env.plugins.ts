process.loadEnvFile()

import * as env from 'env-var'

export const envs = {
    PORT : env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    SECET_EMAIL_KEY:env.get('SECET_EMAIL_KEY').required().asString(),
    PROD:env.get('PROD').required().asBool(),
}