import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

export interface EcsConstructProps {
  vpc: ec2.IVpc;
  repository: ecr.Repository;
  loadBalancer: elbv2.ApplicationLoadBalancer;
  listener: elbv2.ApplicationListener;
  cpu?: number;
  memoryLimitMiB?: number;
  desiredCount?: number;
}

export class EcsConstruct extends Construct {
  public readonly cluster: ecs.Cluster;
  public readonly service: ecs.FargateService;

  constructor(scope: Construct, id: string, props: EcsConstructProps) {
    super(scope, id);

    this.cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: props.vpc,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      cpu: props.cpu || 256,
      memoryLimitMiB: props.memoryLimitMiB || 512,
    });

    const container = taskDefinition.addContainer('AppContainer', {
      image: ecs.ContainerImage.fromEcrRepository(props.repository),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'nestjs-app' }),
      environment: {
        NODE_ENV: 'production',
      },
    });

    container.addPortMappings({
      containerPort: 3000,
    });

    this.service = new ecs.FargateService(this, 'Service', {
      cluster: this.cluster,
      taskDefinition,
      desiredCount: props.desiredCount || 1,
      assignPublicIp: false,
      securityGroups: [
        new ec2.SecurityGroup(this, 'ServiceSecurityGroup', {
          vpc: props.vpc,
          allowAllOutbound: true,
        }),
      ],
    });

    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'TargetGroup', {
      vpc: props.vpc,
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targetType: elbv2.TargetType.IP,
      healthCheck: {
        path: '/health',
        healthyHttpCodes: '200',
      },
    });

    props.listener.addTargetGroups('TargetGroup', {
      targetGroups: [targetGroup],
    });

    this.service.attachToApplicationTargetGroup(targetGroup);
  }
}
