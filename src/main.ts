import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from './config/configuration-interface';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  const config: ConfigService<IEnvironmentVariables> =  app.get(ConfigService);

  const PORT = config.get('port');

  await app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
