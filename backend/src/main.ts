import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ControllerAdviceFilter } from './common/filters/controller-advice.filter';
import fastifyStatic from '@fastify/static';
import multipart from '@fastify/multipart';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://blog_frontend:3000', 'http://localhost:8000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalFilters(new ControllerAdviceFilter())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //config staic files
  const fastify = app.getHttpAdapter().getInstance();
  await fastify.register(multipart);
  await fastify.register(fastifyStatic, { root: join(process.cwd(), 'uploads'), prefix: '/uploads/' });
  const uploadPath = join(process.cwd(), 'uploads/users/profile');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
    console.log(`pasta criada em: ${uploadPath}`);
  }

  //sawgger config
  const config = new DocumentBuilder().setTitle('dev news backend API').setDescription('uma plicação para jornal').setVersion('1.0.0').addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000, '0.0.0.0');
}

bootstrap();
