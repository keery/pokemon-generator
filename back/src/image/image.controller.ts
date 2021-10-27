import {
  Controller,
  Post,
  Req,
  Res,
  Get,
  Response,
  All,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import fs from 'fs'
import { UppyService } from '../uppy/uppy.service'
import { ImageService } from './image.service'
import { uniqFilename } from '~utils/upload'
import { join } from 'path'

const editFileName = (req, file, callback) => {
  callback(null, uniqFilename(file.originalname))
}

@Controller('image')
export class ImageController {
  constructor(
    private uppyService: UppyService,
    public readonly imgService: ImageService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/files',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any) {
    return file.filename
  }

  @Get('tmp/get/:id')
  async getTemporyFile(@Param('id') id, @Res() response: Response) {
    const path = join(__dirname, '../..', `public/files/${id}`)

    if (fs.existsSync(path)) {
      const file = fs.readFileSync(path)
      const stream = this.imgService.bufferToStream(file)
      // @ts-ignore
      response.set({
        'Content-Type': 'image/*',
      })
      // @ts-ignore
      stream.pipe(response)

      fs.unlinkSync(path)
    } else {
      throw new HttpException(
        'Temporary file not found',
        HttpStatus.BAD_REQUEST,
      )
    }
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
