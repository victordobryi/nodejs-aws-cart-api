import {
  Cors,
  LambdaIntegration,
  MethodOptions,
  RestApi,
  RestApiProps,
} from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ApiGateway extends RestApi {
  constructor(scope: Construct, restApiName: string, props?: RestApiProps) {
    super(scope, 'ApiGateway', {
      restApiName,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
      ...props,
    });
  }

  addIntegration(
    method: string,
    path: string,
    lambda: IFunction,
    props?: MethodOptions,
  ) {
    const resource = this.root.resourceForPath(path);
    resource.addMethod(method, new LambdaIntegration(lambda), props);
  }
}
