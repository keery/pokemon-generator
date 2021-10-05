import { Module } from '@nestjs/common'
import { ImageService } from '~image/image.service'
import { UppyService } from '~uppy/uppy.service'
import { ImageController } from './image.controller'

@Module({
  providers: [ImageService, UppyService],
  exports: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
