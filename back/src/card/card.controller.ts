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
import { Ip } from '~decorators/ip'
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
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection } from 'typeorm'
import { getElectionRange } from '~utils/getElectionRange'

const getHasLiked = (ip: string) => {
  return `
    CASE WHEN (
      SELECT CAST(COUNT(*) as INT) AS "cnt" FROM "like" "myLikes" WHERE "myLikes"."ip" = '${ip}' AND card.id = "myLikes"."cardId"
    ) > 0 then TRUE else FALSE end as "hasLiked"
  `
}

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
  async publishCard(
    @UploadedFile() file: any,
    @Body() body: any,
    @Ip() ip: string,
  ) {
    const card = new Card()

    const uploadedFile = await this.imgService.uploadFile(file)

    if (uploadedFile.status !== 200) {
      throw new HttpException('fail-upload', HttpStatus.BAD_REQUEST)
    }

    card.slug = createSlug(body.name)
    card.ip = ip
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

  @Get('count')
  async getCount() {
    return this.service.countCards()
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() parsedRequest: CrudRequest, @Ip() ip: string) {
    let select = ''
    let orderBy = ''
    let groupBy = ''
    let winners = ''
    let andWhere = ''

    if (parsedRequest.parsed.sort.length > 0) {
      orderBy = parsedRequest.parsed.sort
        .map(({ field, order }) => {
          switch (field) {
            case 'random':
              return 'RANDOM ()'
            case 'sort-most-liked-week':
              const { start, end } = getElectionRange()
              select = ', CAST(COUNT(l.id) as INT) as likes'
              andWhere = `AND l.created_at between '${start}' and '${end}'`
              return `likes DESC`
            case 'winner':
              groupBy = ', w.created_at'
              winners = 'INNER JOIN "winner" "w" on card.id = "w"."cardId"'
              return `w.created_at ${order}`
            default:
              return `${field} ${order}`
          }
        })
        .join(' ')
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
      SELECT card.*, CAST(COUNT(l.id) as INT) as likes, ${getHasLiked(
        ip,
      )} ${select}
      FROM card
      LEFT OUTER JOIN "like" "l" on card.id = "l"."cardId"
      ${winners}
      WHERE card."isPublished" = true ${andWhere}
      GROUP BY card.id ${groupBy}
      ${orderBy !== '' ? `ORDER BY ${orderBy}` : ''}
      ${limit}
      `)
  }

  @Override('getOneBase')
  async getOne(@Req() req: Request, @Ip() ip: string) {
    const card = await this.service.getCard(req.params.id)
    const hasLiked = await this.service.hasBeenLiked(card, ip)

    return { ...card, hasLiked }
  }
}
