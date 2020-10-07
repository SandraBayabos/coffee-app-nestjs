import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

/*
somtimes may want to define composite indexes that contain multiple columns 
so we apply @Index decorator & pass in an array of column names as arguments
*/
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  // generic column where we can store event payloads
  @Column('json')
  payload: Record<string, any>;

}
