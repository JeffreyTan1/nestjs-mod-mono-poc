#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();

const stackProps: cdk.StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

new CdkStack(app, 'NestjsAppStack', {
  ...stackProps,
  databaseName: 'nestjs_app',
  databaseUsername: 'nestjs_admin',
  // Uncomment and set if you want to use an existing VPC
  // vpcId: 'vpc-xxxxxxxx',
});
