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
  Get,
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
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'

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
    card.author = body.author
    card.name = body.name
    card.hp = body.hp
    card.element = body.element
    card.description = body.description
    card.attack1Name = body.attack1Name
    card.attack1Description = body.attack1Description
    card.attack1Type = body.attack1Type
    card.attack1Amount = body.attack1Amount
    card.attack1Damage = body.attack1Damage
    card.attack2Name = body.attack2Name
    card.attack2Description = body.attack2Description
    card.attack2Type = body.attack2Type
    card.attack2Amount = body.attack2Amount
    card.attack2Damage = body.attack2Damage
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

  @Get('count')
  async getCount() {
    const res = await this.service.countCards()
    return res
  }

  @Get('winner')
  async getWinner() {
    const date = new Date()
    const start = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd')
    const end = format(
      addDays(endOfWeek(date, { weekStartsOn: 1 }), 1),
      'yyyy-MM-dd',
    )

    const res = await getConnection().query(`
    SELECT card.*, CAST(COUNT(l.id) as INT) as likes
    FROM card
    LEFT OUTER JOIN "like" "l" on card.id = "l"."cardId"
    WHERE l.created_at between '${start}' and '${end}'
    GROUP BY card.id
    ORDER BY likes DESC
    LIMIT 1
    `)

    return res.length > 0 ? res[0] : null
  }
}
