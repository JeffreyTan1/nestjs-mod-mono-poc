import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

export interface AlbConstructProps {
  vpc: ec2.IVpc;
  internetFacing?: boolean;
}

export class AlbConstruct extends Construct {
  public readonly loadBalancer: elbv2.ApplicationLoadBalancer;
  public readonly listener: elbv2.ApplicationListener;

  constructor(scope: Construct, id: string, props: AlbConstructProps) {
    super(scope, id);

    this.loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
      vpc: props.vpc,
      internetFacing: props.internetFacing ?? true,
      securityGroup: new ec2.SecurityGroup(this, 'AlbSecurityGroup', {
        vpc: props.vpc,
        allowAllOutbound: true,
      }),
    });

    this.listener = this.loadBalancer.addListener('HttpListener', {
      port: 80,
      open: true,
    });
  }
}
