import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

// 各DynamoDBテーブルは企業に対応しています。
// それぞれのパーテーションキー（PK）が求人を表し、ソートキー（SK）がそのメタデータと応募を表す単一テーブル構造です。
// テーブル名の形式: “job-application-{企業名}”

const tableName = "job-application-AAAA";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "GET /jobs":
        body = await dynamo.send(
          new ScanCommand({
            TableName: tableName,
            FilterExpression: "begins_with(PK, :job) AND begins_with(SK, :meta)",
            ExpressionAttributeValues: {
              ":job": "job#",
              ":meta": "meta#"
            }
          })
        );
        body = body.Items;
        break;
      case "GET /jobs/{job_id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              PK: `job#${event.pathParameters.job_id}`,
              SK: `meta#${event.pathParameters.job_id}`
            },
          })
        );
        body = body.Item;
        break;
      case "GET /jobs/{job_id}/applications":
        body = await dynamo.send(
          new QueryCommand({
            TableName: tableName,
            KeyConditionExpression: "PK = :pk and begins_with(SK, :app)",
            ExpressionAttributeValues: {
              ":pk": `job#${event.pathParameters.job_id}`,
              ":app": "application#"
            }
          })
        );
        body = body.Items;
        break;
      case "PUT /jobs/{job_id}/applications":
        let requestJSON = JSON.parse(event.body);
        requestJSON.PK = `job#${event.pathParameters.job_id}`;
        requestJSON.SK = `application#${requestJSON.email}`;
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: requestJSON,
          })
        );
        body = `Put item ${requestJSON.PK}, ${requestJSON.SK}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};