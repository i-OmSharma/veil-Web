import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateItemCommand, GetItemCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CONFIG } from "../config";


const client = new DynamoDBClient({ region: CONFIG.REGION });
const docClient = DynamoDBDocumentClient.from(client);

export const incrementMetrics = async (key) => {
  await docClient.send(new UpdateItemCommand({
      TableName: CONFIG.METRICS_TABLE,
      Key: { metric_key: key },
      UpdateExpression: "SET #count = if_not_exists(#count, :zero) + :inc",
      ExpressionAttributeNames: { "#count": "count" },
      ExpressionAttributeValues: { ":inc": 1, ":zero": 0 },
    }),
  );
};

export const getMetrics = async (key) => {
  const res = await docClient.send(new GetItemCommand({
    TableName: CONFIG.METRICS_TABLE,
    Key: { metric_key: key },
  }))
  return res.Item || {count: 0};
}

export const saveFeedback = async (data) => {
  await docClient.send(new PutCommand({
    TableName: CONFIG.FEEDBACK_TABLE,
    Item: data
  }))
};