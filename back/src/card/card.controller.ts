import { ApiTags } from '@nestjs/swagger'
import { Crud } from '@nestjsx/crud'
import { Card } from '~card/card.entity'
import { CardService } from '~card/card.service'
import { ImageService } from '~image/image.service'
import { encodeImageToBlurhash } from '~utils/blurhash'
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import createSlug from 'url-slug'

@Crud({
  model: {
    type: Card,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(
    public readonly service: CardService,
    public readonly imgService: ImageService,
  ) {}

  @Post('publish')
  @UseInterceptors(FileInterceptor('img'))
  async publishCard(@UploadedFile() file: any, @Body() body: any) {
    const card = new Card()

    const uploadedFile = await this.imgService.uploadFile(file)

    if (uploadedFile.status !== 200) {
      throw new HttpException('fail-upload', HttpStatus.BAD_REQUEST)
    }

    card.slug = createSlug(body.name)
    card.name = body.name
    card.hp = body.hp
    card.element = body.element
    card.description = body.description
    card.attack1Name = body.attack1Name
    card.attack1Description = body.attack1Description
    card.attack2Name = body.attack2Name
    card.attack2Description = body.attack2Description
    card.img = `https://drive.google.com/uc?export=view&id=${uploadedFile.data.id}`
    card.blurHash = await encodeImageToBlurhash(file)

    return this.service.create(card)
  }
}
