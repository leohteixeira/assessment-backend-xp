import { PgProduct } from '@/infra/database/entities'

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'categories' })
export class PgCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  code: string

  @Column({ unique: true })
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => PgProduct, product => product.categories)
  products: PgProduct[]
}
