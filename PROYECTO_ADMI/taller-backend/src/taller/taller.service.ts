import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './entities/taller.entity';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';

@Injectable()
export class TallerService {
  constructor(
    @InjectRepository(Taller)
    private tallerRepository: Repository<Taller>,
  ) {}

  async create(createTallerDto: CreateTallerDto) {
    // Reemplaza al INSERT INTO
    const nuevoTaller = this.tallerRepository.create(createTallerDto);
    return await this.tallerRepository.save(nuevoTaller);
  }

  async findAll() {
    // Reemplaza al SELECT * FROM taller
    return await this.tallerRepository.find();
  }

  async update(id: number, updateTallerDto: UpdateTallerDto) {
    // Reemplaza al UPDATE taller SET ...
    await this.tallerRepository.update(id, updateTallerDto);
    return { message: 'Se actualizó correctamente' };
  }

  async remove(id: number) {
    // Reemplaza al DELETE FROM taller
    await this.tallerRepository.delete(id);
    return { message: 'Se eliminó correctamente' };
  }
}
