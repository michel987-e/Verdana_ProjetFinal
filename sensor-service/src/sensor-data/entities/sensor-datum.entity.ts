import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  flower_id: number;

  @Column('decimal')
  temperature: number;

  @Column('decimal')
  humidity: number;

  @Column('decimal')
  light: number;

  @Column('decimal')
  soil: number;

  @CreateDateColumn()
  timestamp!: Date;
}
