import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('jsonb')
  params: Record<string, string | boolean>;

  @ManyToOne(() => Room, (room) => room.devices)
  room: Room;
}
