import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TypedConfigService } from './common/typed-config/typed-config.service';
import { mkdirSync, writeFileSync, existsSync } from 'fs';

const CONTRACTS_DIR = './contracts';

function writeSwaggerContract(document: OpenAPIObject) {
  if (!existsSync(CONTRACTS_DIR)) {
    mkdirSync(CONTRACTS_DIR, { recursive: true });
  }
  writeFileSync(
    `${CONTRACTS_DIR}/swagger.json`,
    JSON.stringify(document, null, 2),
  );
}

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
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('NestJS API')
        .setVersion('1.0')
        .build(),
    );

    writeSwaggerContract(document);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
