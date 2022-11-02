import { getClientIp } from '@supercharge/request-ip'

export const getIp = (req) => {
  if (process.env.NODE_ENV === 'dev') return '::1'
  return getClientIp(req)
}
