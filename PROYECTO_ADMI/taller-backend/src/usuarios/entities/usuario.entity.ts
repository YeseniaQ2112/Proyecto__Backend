import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios') // Nombre de tu tabla en MySQL
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  rol: string;
}