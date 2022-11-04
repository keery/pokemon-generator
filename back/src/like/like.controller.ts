import { ApiTags } from '@nestjs/swagger'
import { LikeService } from '~like/like.service'
import { Ip } from '~decorators/ip'
import {
  Controller,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request } from 'express'

@ApiTags('likes')
@Controller('likes')
export class LikeController {
  constructor(public readonly service: LikeService) {}

  @Post('toggle')
  async toggle(@Req() req: Request, @Body() body: any, @Ip() ip: string) {
    try {
      const isExists = await this.service.findOne({ ip, card: body.cardId })

      let action: Promise<any>
      if (isExists) {
        action = this.service.delete(isExists.id).then(() => 'disliked')
      } else {
        action = this.service
          .create({ ip, card: body.cardId })
          .then(() => 'liked')
      }

      const state = await action

      return this.service
        .count({ card: body.cardId })
        .then((nb) => ({ nb, state }))
    } catch (e) {
      throw new HttpException('vote-error', HttpStatus.BAD_REQUEST)
    }
  }
}
