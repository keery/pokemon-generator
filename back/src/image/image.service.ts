import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { uniqFilename } from '~utils/upload'
import { google } from 'googleapis'
import { Readable } from 'stream'
import credentials from './credentials-google.json'

const SCOPES = ['https://www.googleapis.com/auth/drive.file']
@Injectable()
export class ImageService {
  private readonly auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    SCOPES,
  )

  private drive = google.drive({ version: 'v3', auth: this.auth })

  bufferToStream(binary) {
    // const stream = new Readable({
    //   read() {
    //     this.push(binary)
    //     this.push(null)
    //   },
    // })
    const stream = new Readable()
    stream.push(binary)
    stream.push(null)

    return stream
  }

  async uploadFile(file) {
    try {
      const media = {
        mimeType: file.mimetype,
        body: this.bufferToStream(file.buffer),
      }

      this.drive.files.create(
        {
          // @ts-ignore
          resource: {
            name: uniqFilename(file.originalname),
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
          },
          media: media,
          fields: 'id',
        },
        function (err, file) {
          if (err) {
            console.error(err)
          } else {
            console.log('File Id: ', file.data.id)
          }
        },
      )
    } catch (err) {
      console.log('err', err)
    }
  }

  deleteFile = (url: string) => {
    // const parsed = parseUrl(url)
    // return this.storage
    //   .deleteObject({
    //     Bucket: this.bucketName,
    //     Key: parsed.path,
    //   })
    //   .promise()
  }
}
