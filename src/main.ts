import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IEnvironmentVariables } from './config/configuration-interface';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  const config: ConfigService<IEnvironmentVariables> =  app.get(ConfigService);

  const PORT = config.get('port');

  /* Swagger Set Up */
  const options = new DocumentBuilder()
  .setTitle('Sandbox NestJs API ')
  .setDescription('Sandbox to play around and learn')
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
