import * as sst from "@serverless-stack/resources";

export default class BeerReviewStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const table = new sst.Table(this, "Beers", {
      fields: {
        userId: sst.TableFieldType.STRING,
        beerName: sst.TableFieldType.STRING
      },
      primaryIndex: { partitionKey: "userId", sortKey: "beerName"}
    })

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          tableName: table.dynamodbTable.tableName
        },
        timeout: 60
      },

      routes: {
        "GET /beers": "src/get.main",
        "POST /beers": "src/create.main"
      },
    });

    api.attachPermissions([table])

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }

}
