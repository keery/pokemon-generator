import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Like } from '~like/like.entity'

@Injectable()
export class LikeService extends TypeOrmCrudService<Like> {
  constructor(@InjectRepository(Like) repo) {
    super(repo)
  }

  async create(like: Pick<Like, 'ip' | 'card'>) {
    return await this.repo.save(like)
  }

  async delete(likeId: number) {
    return await this.repo.delete(likeId)
  }
}
