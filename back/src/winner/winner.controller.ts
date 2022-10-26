import { ApiTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'
import { Winner } from '~winner/winner.entity'
import { WinnerService } from '~winner/winner.service'
import { Controller, Get } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
  ) {}

  @Get('elect')
  async elect() {
    return this.service.electWinner()
  }
}
