import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { CardModule } from '~card/card.module'
import { ImageModule } from '~image/image.module'
import { MailModule } from './mail/mail.module'
import { LikeModule } from './like/like.module'
import { ConsoleModule } from 'nestjs-console'
import { ServeStaticModule } from '@nestjs/serve-static'
import { I18nModule, I18nJsonParser } from 'nestjs-i18n'
import * as path from 'path'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('POSTGRESQL_ADDON_HOST'),
          port: Number(config.get('POSTGRESQL_ADDON_PORT')),
          username: config.get('POSTGRESQL_ADDON_USER'),
          password: config.get('POSTGRESQL_ADDON_PASSWORD'),
          database: config.get('POSTGRESQL_ADDON_DB'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: process.env.NODE_ENV === 'dev',
        } as PostgresConnectionOptions
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: process.env.NODE_ENV === 'dev',
      },
    }),
    CardModule,
    ImageModule,
    LikeModule,
    MailModule,
    ConsoleModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
