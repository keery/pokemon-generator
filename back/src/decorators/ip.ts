import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { getIp } from '~utils/ip'

export const Ip = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    const ip = getIp(req)
    return ip
  },
)
