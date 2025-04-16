import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypedConfigService } from './common/typed-config/typed-config.service';
import { setupSwagger } from './common/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const typedConfigService = app.get<TypedConfigService>(TypedConfigService);

  if (typedConfigService.get('IS_LOCAL')) {
    setupSwagger(app);
  }

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
