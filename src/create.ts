import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"

const dynamoDB = new DynamoDBClient({ })

export const main: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  
  const beerScore = JSON.parse(event.body!)

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: { S: beerScore.user },
      beerName: { S: beerScore.beer },
      score: { N: beerScore.score }
    }
  }

  await dynamoDB.send(new PutItemCommand(params))

  return {
    statusCode: 201
  };
};
