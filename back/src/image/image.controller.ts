import {
  Controller,
  Post,
  Req,
  Res,
  All,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UppyService } from '../uppy/uppy.service'

@Controller('image')
export class ImageController {
  constructor(private uppyService: UppyService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    return 'bonjour'
  }

  @All('test')
  async test() {
    return 'test réussi'
  }

  @All('companion')
  async companion(@Req() req, @Res() res) {
    return this.uppyService.handleCompanion(req, res)
  }
}
