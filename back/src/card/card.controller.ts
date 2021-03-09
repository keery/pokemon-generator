import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'
import { Card } from '~card/card.entity'
import { CardService } from '~card/card.service'

@Crud({
  model: {
    type: Card,
  },
})
@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(public readonly service: CardService) {}
}
