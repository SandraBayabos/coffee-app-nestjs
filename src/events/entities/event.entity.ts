import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  // generic column where we can store event payloads
  @Column('json')
  payload: Record<string, any>;

}
