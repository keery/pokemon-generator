import { getClientIp } from '@supercharge/request-ip'

export const getIp = (req) => {
  return getClientIp(req)
}
