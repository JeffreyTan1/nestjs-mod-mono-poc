import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync } from 'fs';
import { writeFileSync } from 'fs';
import { existsSync } from 'fs';

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

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth() // optional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  writeSwaggerContract(document);
}
