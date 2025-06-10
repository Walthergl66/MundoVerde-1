import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ConsultaClima } from './ConsultaClimaEntity';

@Entity()
export class Clima {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => ConsultaClima, consulta => consulta.clima)
    @JoinColumn({ name: 'consultaId' })
    consulta!: ConsultaClima;

    @Column('decimal')
    temperatura!: number;

    @Column('decimal')
    humedad!: number;

    @Column()
    descripcion!: string;

    @Column('decimal')
    viento!: number;

    @Column('decimal')
    presion!: number;
}
