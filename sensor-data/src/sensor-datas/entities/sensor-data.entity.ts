import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sensor_name!: string;

  @Column('decimal')
  value!: number;

  @Column({ nullable: true })
  unit?: string;

  @CreateDateColumn()
  timestamp!: Date;
}
