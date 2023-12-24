import { Stack, StackProps } from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ApiGateway } from './ApiGateway';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new ApiGateway(this, 'NestAppApi');

    const nestAppLambda = new Function(this, 'nestAppLambda', {
      code: Code.fromAsset('../dist', {
        exclude: ['node_modules'],
      }),
      handler: 'main.handler',
      runtime: Runtime.NODEJS_18_X,
    });

    api.addIntegration('ANY', '{proxy+}', nestAppLambda);
  }
}
