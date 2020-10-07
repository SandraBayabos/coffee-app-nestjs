import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany} from 'typeorm'
import { Flavour } from './flavour.entity'

@Entity() // sql table === 'coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // added because we created the Event entity
  @Column({ default: 0})
  recommendations: number;

  // @JoinTable decorator helps specify the owner side of the relationship i.e. the coffee entity in this case
  @JoinTable()
  @ManyToMany(type => Flavour, (flavour) => flavour.coffees, {
    cascade: true
  })
  flavours: Flavour[];
}