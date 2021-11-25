import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
// import { Card } from '~card/card.entity'

@Injectable()
export class CardService {
  // constructor(@InjectRepository(Card) repo) {
  //   super(repo)
  // }
}
