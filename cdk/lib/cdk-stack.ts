import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { EcrConstruct } from './constructs/ecr/ecr-construct';
import { AlbConstruct } from './constructs/alb/alb-construct';
import { RdsConstruct } from './constructs/rds/rds-construct';
import { EcsConstruct } from './constructs/ecs/ecs-construct';
import { SsmConstruct } from './constructs/ssm/ssm-construct';

export interface CdkStackProps extends cdk.StackProps {
  vpcId?: string;
  databaseName: string;
  databaseUsername: string;
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CdkStackProps) {
    super(scope, id, props);

    // Create or import VPC
    const vpc = props.vpcId
      ? ec2.Vpc.fromLookup(this, 'Vpc', { vpcId: props.vpcId })
      : new ec2.Vpc(this, 'Vpc', {
          maxAzs: 2,
          natGateways: 1,
        });

    // Create ECR repository
    const ecrConstruct = new EcrConstruct(this, 'Ecr', {
      repositoryName: 'nestjs-app',
    });

    // Create ALB
    const albConstruct = new AlbConstruct(this, 'Alb', {
      vpc,
    });

    // Create RDS
    const rdsConstruct = new RdsConstruct(this, 'Rds', {
      vpc,
      databaseName: props.databaseName,
      masterUsername: props.databaseUsername,
    });

    // Create SSM construct for parameters and secrets
    const ssmConstruct = new SsmConstruct(this, 'Ssm', {
      parameterPrefix: '/nestjs-app',
      secretPrefix: '/nestjs-app/secrets',
    });

    // Add database connection parameters
    ssmConstruct.addParameter(
      'DB_HOST',
      rdsConstruct.cluster.clusterEndpoint.hostname,
      'Database hostname',
    );
    ssmConstruct.addParameter('DB_PORT', '5432', 'Database port');
    ssmConstruct.addParameter('DB_NAME', props.databaseName, 'Database name');

    // Create ECS service
    const ecsConstruct = new EcsConstruct(this, 'Ecs', {
      vpc,
      repository: ecrConstruct.repository,
      loadBalancer: albConstruct.loadBalancer,
      listener: albConstruct.listener,
    });

    // Grant ECS task role access to SSM parameters and secrets
    const taskRole = ecsConstruct.service.taskDefinition.taskRole;
    ssmConstruct.getParameter('DB_HOST').grantRead(taskRole);
    ssmConstruct.getParameter('DB_PORT').grantRead(taskRole);
    ssmConstruct.getParameter('DB_NAME').grantRead(taskRole);
    rdsConstruct.cluster.secret?.grantRead(taskRole);

    // Output the ALB DNS name
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: albConstruct.loadBalancer.loadBalancerDnsName,
    });
  }
}
