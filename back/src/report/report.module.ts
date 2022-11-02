import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from '~report/report.entity'
import { ReportSubscriber } from './report.subscriber'

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportService, ReportSubscriber],
  controllers: [ReportController],
})
export class ReportModule {}
