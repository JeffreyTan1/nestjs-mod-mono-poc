# NestJS Modular Monolith POC

## Project Overview

This project is a proof of concept for a modular monolith architecture using NestJS. It demonstrates how to structure a large application into cohesive modules while maintaining the simplicity of a monolithic deployment.

## Features

- [ ] Modular architecture with clear boundaries
- [ ] Shared infrastructure services
- [ ] Centralized configuration management
- [ ] Integrated authentication and authorization
- [ ] Database migrations and seeding
- [ ] Comprehensive logging and monitoring
- [ ] API documentation with Swagger
- [ ] End-to-end testing infrastructure
- [ ] CI/CD pipeline configuration

## Project setup

```bash
$ npm install

# local database
$ ./scripts/local_setup.sh

# tooling: @nestjs/cli, aws-cdk
$ npm install -g @nestjs/cli
$ npm install -g aws-cdk

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment


## Resources

- [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- [Discord channel](https://discord.gg/G7Qnnhy).
- Visualization [NestJS Devtools](https://devtools.nestjs.com).
