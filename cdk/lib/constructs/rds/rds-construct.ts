import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

export interface RdsConstructProps {
  vpc: ec2.IVpc;
  databaseName: string;
  masterUsername: string;
  instanceType?: ec2.InstanceType;
  allocatedStorage?: number;
  backupRetention?: cdk.Duration;
}

export class RdsConstruct extends Construct {
  public readonly cluster: rds.DatabaseCluster;

  constructor(scope: Construct, id: string, props: RdsConstructProps) {
    super(scope, id);

    const securityGroup = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
    });

    this.cluster = new rds.DatabaseCluster(this, 'Database', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_3,
      }),
      credentials: rds.Credentials.fromGeneratedSecret(props.masterUsername),
      instanceProps: {
        instanceType:
          props.instanceType ||
          ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
        vpc: props.vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        securityGroups: [securityGroup],
      },
      defaultDatabaseName: props.databaseName,
      storageEncrypted: true,
      backup: {
        retention: props.backupRetention || cdk.Duration.days(7),
      },
      removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
    });
  }
}
