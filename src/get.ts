import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb"

const dynamoDB = new DynamoDBClient({ })

export const main: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {

  const userId = event.queryStringParameters?.user ?? ''
  const beerName = event.queryStringParameters?.beer ?? ''

  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: { S: userId },
      beerName: { S: beerName } 
    }
  }

  const result = await dynamoDB.send(new GetItemCommand(params))

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({score: result.Item?.score.N ?? 0}),
  };
};
