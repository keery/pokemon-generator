import { Module } from '@nestjs/common'
import { CronService } from './cron.service'
import { WinnerService } from '~/winner/winner.service'
import { WinnerModule } from '~/winner/winner.module'

@Module({
  providers: [CronService],
  imports: [WinnerModule],
})
export class CronModule {}
