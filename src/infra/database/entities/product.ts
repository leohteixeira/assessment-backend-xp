import { PgCategory } from '@/infra/database/entities'

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'products' })
export class PgProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  sku: string

  @Column()
  price: number

  @Column({ nullable: true })
  description: string

  @Column()
  quantity: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => PgCategory, category => category.products)
  @JoinTable()
  categories: PgCategory[]
}
