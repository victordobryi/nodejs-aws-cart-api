import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { environment } from './environmet';
import { getDatabaseConnection } from './db-manager';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'NestApi');

    const nestJSLambda = new Function(this, 'NestJSLambda', {
      code: Code.fromAsset('../dist', {
        exclude: ['node_modules'],
      }),
      handler: 'main.handler',
      runtime: Runtime.NODEJS_18_X,
      environment: environment,
    });

    const proxyResource = api.root.addResource('{proxy+}');
    proxyResource.addMethod('ANY', new LambdaIntegration(nestJSLambda));
    proxyResource.addCorsPreflight({
      allowOrigins: Cors.ALL_ORIGINS,
      allowHeaders: Cors.DEFAULT_HEADERS,
      allowMethods: ['GET', 'PUT', 'OPTIONS'],
    });

    getDatabaseConnection();
  }
}
