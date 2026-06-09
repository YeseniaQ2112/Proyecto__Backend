import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // AGREGA ESTA LÍNEA AQUÍ:
  app.enableCors({
    origin: 'http://localhost:5173', // La URL donde corre tu React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();