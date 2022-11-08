import { Module } from '@nestjs/common'
import { WinnerService } from './winner.service'
import { WinnerController } from './winner.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageService } from '~image/image.service'
import { Card } from '~card/card.entity'
import { CardService } from '~card/card.service'
import { Winner } from '~winner/winner.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Winner]),
    TypeOrmModule.forFeature([Card]),
  ],
  exports: [WinnerService],
  providers: [WinnerService, ImageService, CardService],
  controllers: [WinnerController],
})
export class WinnerModule {}
