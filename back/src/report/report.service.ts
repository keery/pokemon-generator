import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Report } from '~report/report.entity'

@Injectable()
export class ReportService extends TypeOrmCrudService<Report> {
  constructor(@InjectRepository(Report) repo) {
    super(repo)
  }
}
