import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { uniqFilename } from '~utils/upload'
import { parseUrl } from '@aws-sdk/url-parser'
import AWS from 'aws-sdk'

AWS.config.update({
  s3: {
    region: 'eu-west-3',
    apiVersion: 'latest',
  },
})

@Injectable()
export class ImageService {
  private readonly storage = new AWS.S3()
  private bucketName = process.env.AWS_BUCKET_NAME

  async uploadFile(file) {
    try {
      const { originalname, buffer } = file
      const filename = uniqFilename(originalname)
      const upload = await this.storage
        .upload({
          Bucket: this.bucketName,
          Body: buffer,
          Key: filename,
        })
        .promise()
      return {
        fileUrl: upload.Location,
        name: filename,
      }
    } catch (e) {
      throw new HttpException(
        `Impossible to upload file ${file.originalname} - ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  deleteFile = (url: string) => {
    const parsed = parseUrl(url)

    return this.storage
      .deleteObject({
        Bucket: this.bucketName,
        Key: parsed.path,
      })
      .promise()
  }
}
