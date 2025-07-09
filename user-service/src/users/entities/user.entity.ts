import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CountryCode } from '../countryCode';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'enum',
    enum: CountryCode,
    nullable: true,
  })
  country: CountryCode;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  created_at: Date;
}