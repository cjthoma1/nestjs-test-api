import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import csurf from 'csurf';
import fastifyCookie from 'fastify-cookie';
import helmet from 'fastify-helmet';
import { AppModule } from './app.module';
import { IEnvironmentVariables } from './config/configuration-interface';

declare const module: any; // Needed for hot module reloading

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  const config: ConfigService<IEnvironmentVariables> = app.get(ConfigService);
  const ENV = config.get('env');
  const PORT = config.get('port');

  app.enableCors({
    origin: ENV === 'development' ? '*' : 'https://real-url.com',
    credentials: true
  });

  app.register(fastifyCookie);
  app.register(csurf, { cookie: true });
  app.register(helmet);

  /* Swagger Set Up */
  const options = new DocumentBuilder()
  .setTitle('Test NestJs API ')
  .setDescription('Test to play around and learn')
  .setVersion('1.0')
  .addTag('app')
  .addTag('auth')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  /* ^ Swagger Set Up ^ **/
  
  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
