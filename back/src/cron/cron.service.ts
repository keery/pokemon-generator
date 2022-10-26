import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { WinnerService } from '~winner/winner.service'

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name)

  constructor(private readonly winnerService: WinnerService) {}

  @Cron('0 20 * * 0')
  electWinner() {
    this.logger.debug('Called when the second is 45')
    this.winnerService.electWinner()
  }
}
