import { Module } from '@nestjs/common'
import { WinnerService } from './winner.service'
import { WinnerController } from './winner.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageService } from '~image/image.service'
import { Winner } from '~winner/winner.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Winner])],
  providers: [WinnerService, ImageService],
  exports: [WinnerService],
  controllers: [WinnerController],
})
export class WinnerModule {}
