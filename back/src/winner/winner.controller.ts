import { ApiTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'
import { Winner } from '~winner/winner.entity'
import { WinnerService } from '~winner/winner.service'
import { CardService } from '~card/card.service'
import { Controller, Get } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ip } from '~decorators/ip'

@Crud({
  model: {
    type: Winner,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@ApiTags('winners')
@Controller('winners')
export class WinnerController {
  constructor(
    @InjectRepository(Winner)
    private winnerRepo: Repository<Winner>,
    public readonly service: WinnerService,
    public readonly cardService: CardService,
  ) {}

  @Get('elect')
  elect() {
    return this.service.electWinner()
  }

  @Get('clap')
  clap() {
    return this.service.clapWinner()
  }

  @Get('/')
  async getWinner(@Ip() ip: string) {
    const winner = await this.service.getWinner()
    const hasLiked = await this.cardService.hasBeenLiked(winner.card, ip)

    return {
      ...winner,
      card: {
        ...winner.card,
        hasLiked,
      },
    }
  }
}
