import * as dotenv from 'dotenv'
import * as path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const env = process.env.NODE_ENV || 'dev'
let config

if ((env === 'dev' || env === 'test') && !process.env.CI) {
  config = dotenv.config({
    path: path.resolve(__dirname, '..', `.env.${env}`),
  }).parsed
} else {
  const {
    POSTGRESQL_ADDON_HOST,
    POSTGRESQL_ADDON_PORT,
    POSTGRESQL_ADDON_USER,
    POSTGRESQL_ADDON_PASSWORD,
    POSTGRESQL_ADDON_DB,
  } = process.env
  config = {
    POSTGRESQL_ADDON_HOST,
    POSTGRESQL_ADDON_PORT,
    POSTGRESQL_ADDON_USER,
    POSTGRESQL_ADDON_PASSWORD,
    POSTGRESQL_ADDON_DB,
  }
}

// const ormconfig: PostgresConnectionOptions = {
//   type: 'postgres',
//   host: config.POSTGRESQL_ADDON_HOST,
//   port: Number(config.POSTGRESQL_ADDON_PORT),
//   username: config.POSTGRESQL_ADDON_USER,
//   password: config.POSTGRESQL_ADDON_PASSWORD,
//   database: config.POSTGRESQL_ADDON_DB,
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   logging: env === 'dev',
//   migrations: [__dirname + '/migrations/*{.ts,.js}'],
//   ...(process.env.NODE_ENV === 'production'
//     ? {
//         extra: {
//           ssl: {
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {}),
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// }
const ormconfig = {}

export = ormconfig
