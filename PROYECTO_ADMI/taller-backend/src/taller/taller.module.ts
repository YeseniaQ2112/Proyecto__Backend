import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';
import { Taller } from './entities/taller.entity';

@Module({
  // Aquí le decimos a NestJS que este módulo tendrá acceso a la tabla 'taller'
  imports: [TypeOrmModule.forFeature([Taller])], 
  controllers: [TallerController],
  providers: [TallerService],
})
export class TallerModule {}