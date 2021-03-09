import { JWK, JWT } from 'jose'
import hkdf from 'futoin-hkdf'

// Based on https://github.com/nextauthjs/next-auth/blob/main/src/lib/jwt.js
const DEFAULT_SIGNATURE_ALGORITHM = 'HS512'

const getDerivedSigningKey = (secret: string) => {
  const buffer = hkdf(secret, 64, {
    info: 'NextAuth.js Generated Signing Key',
    hash: 'SHA-256',
  })
  const key = JWK.asKey(buffer, {
    alg: DEFAULT_SIGNATURE_ALGORITHM,
    use: 'sig',
    kid: 'nextauth-auto-generated-signing-key',
  })
  return key
}

const verify = (
  token: string,
  secret: string,
  options = {
    algorithms: [DEFAULT_SIGNATURE_ALGORITHM],
  },
) => {
  const key = getDerivedSigningKey(secret)

  return JWT.verify(token, key, options)
}

export default {
  verify,
}
