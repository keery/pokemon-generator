import { Module } from '@nestjs/common'
import { ImageStorageService } from '~image_storage/image_storage.service'

@Module({
  providers: [ImageStorageService],
  exports: [ImageStorageService],
})
export class ImageStorageModule {}
