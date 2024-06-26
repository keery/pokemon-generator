import { ApiTags } from '@nestjs/swagger'
import {
  Crud,
  Override,
  ParsedRequest,
  ParsedBody,
  CrudController,
  CrudRequest,
} from '@nestjsx/crud'
import { Report } from '~report/report.entity'
import { ReportService } from '~report/report.service'
import { Controller } from '@nestjs/common'
import { Ip } from '~decorators/ip'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Crud({
  model: {
    type: Report,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase'],
  },
})
@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
    public readonly service: ReportService,
  ) {}

  get base(): CrudController<Report> {
    return this
  }

  @Override('createOneBase')
  createOne(
    @ParsedRequest() parsedReq: CrudRequest,
    @ParsedBody() dto: Report,
    @Ip() ip: string,
  ) {
    dto.ip = ip
    return this.base.createOneBase(parsedReq, dto)
  }
}
