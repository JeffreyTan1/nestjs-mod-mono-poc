import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export interface EcrConstructProps {
  repositoryName: string;
  removalPolicy?: cdk.RemovalPolicy;
}

export class EcrConstruct extends Construct {
  public readonly repository: ecr.Repository;

  constructor(scope: Construct, id: string, props: EcrConstructProps) {
    super(scope, id);

    this.repository = new ecr.Repository(this, 'Repository', {
      repositoryName: props.repositoryName,
      removalPolicy: props.removalPolicy || cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true,
    });
  }
}
