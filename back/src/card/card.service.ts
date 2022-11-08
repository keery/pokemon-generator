import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Card } from '~card/card.entity'

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  constructor(@InjectRepository(Card) repo) {
    super(repo)
  }

  async create(card: Card) {
    return await this.repo.save(card)
  }

  countCards() {
    return this.repo.count({
      where: {
        isPublished: true,
      },
    })
  }

  getCard(id: string) {
    return this.repo
      .createQueryBuilder('card')
      .addSelect('CAST(COUNT(like.id) as INT)', 'likes')
      .loadRelationCountAndMap('card.likes', 'card.likes')
      .leftJoin('card.likes', 'like')
      .where('card.id = :id', { id })
      .groupBy('card.id')
      .getOne()
  }

  async hasBeenLiked(card: Card, ip: string): Promise<boolean> {
    const res = await this.repo.query(
      `SELECT CAST(COUNT(*) as INT) AS "hasLiked" FROM "like" "myLikes" WHERE "myLikes"."ip" = '${ip}' AND "myLikes"."cardId" = '${card.id}'`,
    )

    if (res.length > 0) {
      return res[0].hasLiked > 0
    }
    return false
  }
}
