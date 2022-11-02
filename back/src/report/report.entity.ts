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
export class Report {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  reason: string

  @Column({
    nullable: true,
  })
  description: string

  @Column()
  ip: string

  @Column({
    default: false,
  })
  isSolved: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => Card, (card) => card.reports, {
    nullable: false,
  })
  card: Card
}
