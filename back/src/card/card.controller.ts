import { ApiTags } from '@nestjs/swagger'
import {
  Crud,
  Override,
  ParsedRequest,
  CrudController,
  CrudRequest,
} from '@nestjsx/crud'
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
  Req,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import createSlug from 'url-slug'
import { getIp } from '~utils/ip'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection } from 'typeorm'

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
    @InjectRepository(Card)
    private cardRepo: Repository<Card>,
    public readonly service: CardService,
    public readonly imgService: ImageService,
  ) {}

  get base(): CrudController<Card> {
    return this
  }

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

  @Override('getManyBase')
  async getMany(
    @ParsedRequest() parsedRequest: CrudRequest,
    @Req() req: Request,
  ) {
    const ip = getIp(req)

    let orderBy = ''

    if (parsedRequest.parsed.sort.length > 0) {
      orderBy = `ORDER BY ${parsedRequest.parsed.sort
        .map(({ field, order }) => {
          if (field === 'random') return 'RANDOM ()'
          return `${field} ${order}`
        })
        .join(' ')}`
    }

    let limit = 'LIMIT 50'
    if (parsedRequest.parsed.limit) {
      limit = `LIMIT ${parsedRequest.parsed.limit}`

      if (parsedRequest.parsed.page) {
        limit += ` OFFSET ${
          parsedRequest.parsed.limit * parsedRequest.parsed.page
        }`
      }
    }

    return getConnection().query(`
      SELECT card.*, CAST(COUNT(l.id) as INT) as likes,
      (
        SELECT CAST(COUNT(*) as INT) AS "cnt" FROM "like" "myLikes" WHERE "myLikes"."ip" = '${ip}' AND card.id = "myLikes"."cardId"
      ) as has_liked
      FROM card
      LEFT OUTER JOIN "like" "l" on card.id = "l"."cardId"
      GROUP BY card.id
      ${orderBy}
      ${limit}
      `)
  }
}
