import * as bcrypt from 'bcryptjs'
import { createHash } from 'crypto'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const compareHashedPassword = (hashed: string, password: string) => {
  return bcrypt.compare(password, hashed)
}

export const hashSha256 = (content: string) => {
  const hash = createHash('sha256')
  hash.update(content)

  return hash.digest('hex')
}
