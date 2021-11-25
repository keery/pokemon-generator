import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  img: string

  @Column()
  slug: string

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  description: string

  @Column({
    nullable: true,
  })
  attack1Name: string

  @Column({
    nullable: true,
  })
  attack1Description: string

  @Column({
    nullable: true,
  })
  attack2Name: string

  @Column({
    nullable: true,
  })
  attack2Description: string

  @Column({
    default: false,
  })
  isPublished: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
