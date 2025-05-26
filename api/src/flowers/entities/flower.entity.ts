import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { SensorDatum } from 'src/sensor_data/entities/sensor_datum.entity';

@Entity()
export class Flower {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, user => user.flowers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    plant_type: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    location: string;

    @Column({
        type: 'float',
        nullable: true
    })
    temp_min: number;

    @Column({
        type: 'float',
        nullable: true
    })
    temp_max: number;

    @Column({type: 'float',
        nullable: true

    })
    humidity_min: number;

    @Column({
        type: 'float',
        nullable: true
    })
    humidity_max: number;

    @Column({
        type: 'float',
        nullable: true
    })
    soil_min: number;

    @Column({
        type: 'float',
        nullable: true
    })
    soil_max: number;

    @Column({
        type: 'float',
        nullable: true
    })
    light_min: number;

    @Column({
        type: 'float',
        nullable: true
    })
    light_max: number;

    @CreateDateColumn({
        type: 'timestamp',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updated_at: Date;

    @OneToMany(() => SensorDatum, sensor_datum => sensor_datum.flower)
    sensor_datums: SensorDatum[];
}
