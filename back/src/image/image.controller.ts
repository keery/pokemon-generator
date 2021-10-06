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
import { ImageService } from './image.service'

@Controller('image')
export class ImageController {
  constructor(
    private uppyService: UppyService,
    public readonly imgService: ImageService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // @Res() response: Response,
  ) {
    this.imgService.uploadFile(file)
    return 'test'
    // // console.log(file)
    // // @ts-ignore
    // response.set({
    //   'Content-Type': file.mimetype,
    // })
    // const stream = this.imgService.bufferToStream(file.buffer)
    // console.log(file)
    // // @ts-ignore
    // stream.pipe(response)
    // return file.buffer
  }

  @All('test')
  async test() {
    // this.imgService.uploadFile()
    // this.imgService.test()
    return 'test réussi'
  }

  @All('companion')
  async companion(@Req() req, @Res() res) {
    return this.uppyService.handleCompanion(req, res)
  }
}
