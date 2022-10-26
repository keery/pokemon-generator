import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Winner } from '~winner/winner.entity'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import differenceInDays from 'date-fns/differenceInDays'

@Injectable()
export class WinnerService extends TypeOrmCrudService<Winner> {
  constructor(@InjectRepository(Winner) repo) {
    super(repo)
  }

  async getWinnerToElect() {
    const date = new Date()
    const start = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd')
    const end = format(
      addDays(endOfWeek(date, { weekStartsOn: 1 }), 1),
      'yyyy-MM-dd',
    )

    const mostLiked = await this.repo.query(`
    SELECT card.*, CAST(COUNT(l.id) as INT) as likes
    FROM card
    LEFT OUTER JOIN "like" "l" on card.id = "l"."cardId"
    WHERE l.created_at between '${start}' and '${end}'
    GROUP BY card.id
    ORDER BY likes DESC
    LIMIT 1
    `)

    if (mostLiked.length > 0) {
      return mostLiked[0]
    }

    // If no likes found we return first card created into our range
    const firstCreated = await this.repo.query(`
    SELECT card.*
    FROM card
    WHERE card.created_at between '${start}' and '${end}'
    LIMIT 1
    `)
    if (firstCreated.length > 0) {
      return firstCreated[0]
    }

    return null
  }

  getWinner() {
    return this.repo.findOne({
      join: {
        alias: 'c',
        leftJoinAndSelect: { users: 'c.card' },
      },
      order: {
        id: 'DESC',
      },
    })
  }

  async electWinner() {
    const winner = await this.getWinnerToElect()

    if (!winner) {
      throw new HttpException('No winner found', HttpStatus.BAD_REQUEST)
    }

    const lastWinner = await this.repo.findOne({
      order: {
        id: 'DESC',
      },
    })

    // First time no winner exists
    if (lastWinner) {
      const diffDays = differenceInDays(
        new Date(),
        new Date(lastWinner.created_at),
      )

      if (diffDays <= 6) {
        throw new HttpException(
          'Last winner got elected less than 7 days ago',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      }
    }

    return this.repo.save({
      card: winner,
    })
  }

  async clapWinner() {
    const winner = await this.getWinner()
    console.log(winner)
    return this.repo.update(winner.id, {
      clap: winner.clap + 1,
    })
  }
}
