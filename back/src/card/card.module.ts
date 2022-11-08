import { Module } from '@nestjs/common'
import { CardService } from './card.service'
import { CardController } from './card.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageService } from '~image/image.service'
import { Card } from '~card/card.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  exports: [CardService],
  providers: [CardService, ImageService],
  controllers: [CardController],
})
export class CardModule {}
