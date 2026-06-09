import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../logs/entities/log.entity'; // Asegúrate de ajustar la ruta a tu entidad

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection.remoteAddress;
    const browser = request.headers['user-agent'] || 'Desconocido';
    
    // Capturamos el ID del usuario si existe
    const usuario_id = request.user?.id || 0; 
    const evento = request.method === 'POST' ? 'Acceso/Acción' : 'Consulta';

    // ... dentro del método intercept
return next.handle().pipe(
  tap(async () => {
    // Creamos la instancia vacía y luego asignamos las propiedades
    const log = this.logRepository.create();
    log.usuario_id = usuario_id;
    log.evento = evento;
    log.ip = ip;
    log.browser = browser;
    log.fecha = new Date();

    await this.logRepository.save(log);
  }),
);
  }
}