import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Connection,
} from 'typeorm'
import { Report } from './report.entity'
import { Injectable, Scope } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'

@EventSubscriber()
@Injectable({ scope: Scope.REQUEST })
export class ReportSubscriber implements EntitySubscriberInterface<Report> {
  constructor(@InjectConnection() connection: Connection) {
    /**
     * Only run when we are not in a test environment
     */
    if (process.env.NODE_ENV !== 'test' && !process.env.CI) {
      connection.subscribers.push(this)
    }
  }

  listenTo() {
    return Report
  }

  afterInsert(event: InsertEvent<Report>) {
    //TODO: EMAIL to prevent a report has been created
  }
}
