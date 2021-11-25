import { ApiTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'
import { Card } from '~card/card.entity'
import { CardService } from '~card/card.service'
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Crud({
  model: {
    type: Card,
  },
})
@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(public readonly service: CardService) {}

  @Post('publish')
  @UseInterceptors(FileInterceptor('img'))
  publishCard(@UploadedFile() file: any, @Body() body) {
    console.log(file, body)
  }
}
