import { extname, parse } from 'path'
import { v4 as uuid } from 'uuid'
import createSlug from 'url-slug'
import { HttpException, HttpStatus } from '@nestjs/common'

const isImage = (file) => {
  const extension = extname(file.originalname)
  return ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(extension)
}

export const onlyImages = (req, file, callback) => {
  if (!isImage(file)) {
    return callback(
      new HttpException('Only image files are allowed', HttpStatus.BAD_REQUEST),
      false,
    )
  }
  callback(null, true)
}

export const uniqFilename = (filename: string) => {
  const { name, ext } = parse(filename)
  return `${createSlug(name)}-${new Date().getTime()}-${uuid()}${ext}`
}
