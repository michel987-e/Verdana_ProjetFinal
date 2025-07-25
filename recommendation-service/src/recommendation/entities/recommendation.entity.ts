import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    nullable: false
  })
  user_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false
  })
  token: string;
}
