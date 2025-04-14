import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface SsmConstructProps {
  parameterPrefix: string;
  secretPrefix: string;
}

export class SsmConstruct extends Construct {
  public readonly parameters: { [key: string]: ssm.StringParameter };
  public readonly secrets: { [key: string]: secretsmanager.Secret };

  constructor(scope: Construct, id: string, props: SsmConstructProps) {
    super(scope, id);

    console.log('props', props);

    this.parameters = {};
    this.secrets = {};
  }

  public addParameter(
    name: string,
    value: string,
    description?: string,
  ): ssm.StringParameter {
    const parameter = new ssm.StringParameter(this, `Param${name}`, {
      parameterName: `${this.node.tryGetContext('parameterPrefix')}/${name}`,
      stringValue: value,
      description,
    });

    this.parameters[name] = parameter;
    return parameter;
  }

  public addSecret(name: string, secretString: string): secretsmanager.Secret {
    const secret = new secretsmanager.Secret(this, `Secret${name}`, {
      secretName: `${this.node.tryGetContext('secretPrefix')}/${name}`,
      secretStringValue: cdk.SecretValue.unsafePlainText(secretString),
    });

    this.secrets[name] = secret;
    return secret;
  }

  public getParameter(name: string): ssm.StringParameter {
    return this.parameters[name];
  }

  public getSecret(name: string): secretsmanager.Secret {
    return this.secrets[name];
  }
}
