import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Like } from '~like/like.entity'
import { Winner } from '~winner/winner.entity'

export enum Element {
  FIRE = 'fire',
  GRASS = 'grass',
  WATER = 'water',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  FIGHTING = 'fighting',
  NORMAL = 'normal',
}

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  author: string

  @Column()
  img: string

  @Column()
  slug: string

  @Column()
  name: string

  @Column()
  hp: string

  @Column()
  blurHash: string

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
  attack1Type: string

  @Column({
    nullable: true,
  })
  attack1Amount: string

  @Column({
    nullable: true,
  })
  attack1Damage: string

  @Column({
    nullable: true,
  })
  attack2Name: string

  @Column({
    nullable: true,
  })
  attack2Description: string

  @Column({
    nullable: true,
  })
  attack2Type: string

  @Column({
    nullable: true,
  })
  attack2Amount: string

  @Column({
    nullable: true,
  })
  attack2Damage: string

  @Column({
    default: true,
  })
  isPublished: boolean

  @Column({
    type: 'enum',
    enum: Element,
  })
  element: Element

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Like, (like) => like.card)
  likes: Like[]

  @OneToMany(() => Winner, (winner) => winner.card)
  winners: Winner[]
}
