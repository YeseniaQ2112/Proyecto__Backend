import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taller') // Esto enlaza la clase con tu tabla exacta en MySQL
export class Taller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_prop: string;

  @Column()
  nro_celular: string;

  @Column()
  tipo_auto: string;

  @Column()
  tipo_trabajo: string;

  @Column()
  hora_atencion: string;

  @Column()
  dia: string;
}