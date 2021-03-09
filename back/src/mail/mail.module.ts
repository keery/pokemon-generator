import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('SMTP_HOST')
        const user = configService.get('SMTP_USERNAME')
        const pass = configService.get('SMTP_PASSWORD')
        const port = configService.get('SMTP_PORT')
        const tls = configService.get('TLS_POLICY')

        return {
          transport: {
            host,
            port,
            auth:
              user && pass
                ? {
                    user,
                    pass,
                  }
                : undefined,
            ignoreTLS: tls === 'ignore',
          },
          template: {
            dir: process.cwd() + '/src/mail/templates',

            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
