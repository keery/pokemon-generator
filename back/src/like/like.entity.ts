import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm'
import { Card } from '~card/card.entity'

@Unique('UQ_LIKE', ['card', 'ip'])
@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ip: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => Card, (card) => card.likes, {
    nullable: false,
  })
  card: Card
}
