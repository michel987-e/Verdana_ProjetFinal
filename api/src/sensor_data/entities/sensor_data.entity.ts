import { Flower } from "src/flowers/entities/flower.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class SensorData {
    @PrimaryColumn()
    id: number;

    @Column()
    pot_id: number;
        
    @ManyToOne(() => Flower, flower => flower.sensor_datas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pot_id' })
    flower: Flower;

    @Column({
        type: "float",
        nullable: true
    })
    temperature: number;

    @Column({
        type: "float",
        nullable: true
    })
    humidity: number;
    
    @Column({
        type: "float",
        nullable: true
    })
    soil: number;

    @Column({
        type: "float",
        nullable: true
    })
    light: number;


    @CreateDateColumn({
        type: "timestamp"
    })
    timestamp: Date;
}
