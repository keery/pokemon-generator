import { encode } from 'blurhash'
import sharp from 'sharp'

export const encodeImageToBlurhash = async (file) => {
  const { data, info } = await sharp(file.buffer)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true })

  return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
}
