import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core'; // Necesario para el interceptor global

// Asegúrate de que esta ruta sea exacta a donde guardaste el archivo
import { LoggingInterceptor } from './interceptors/logging.interceptor'; 

import { TallerModule } from './taller/taller.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'proyecto_cliente',
      autoLoadEntities: true, 
      synchronize: true, // Esto creará la tabla 'logs' automáticamente al iniciar
    }),
    TallerModule,
    UsuariosModule,
    LogsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}