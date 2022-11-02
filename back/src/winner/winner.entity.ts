import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Card } from '~card/card.entity'

@Entity()
export class Winner {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: 0,
  })
  clap: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => Card, (card) => card.winners)
  card: Card
}
