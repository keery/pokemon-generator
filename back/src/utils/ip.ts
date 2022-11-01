import { getClientIp } from '@supercharge/request-ip'

export const getIp = (req) => {
  return '::1'
  // return getClientIp(req)
}
