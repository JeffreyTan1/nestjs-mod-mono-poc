import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Env } from './env.schema';

@Injectable()
export class TypedConfigService extends NestConfigService<Env> {}
