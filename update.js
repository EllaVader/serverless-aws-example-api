import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  
  console.log("Event is: ", event);
  const data = JSON.parse(event.body);
  console.log("Data is:", data);
  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identiy id of the authenticated user
    // - 'noteId': path paramter

    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },

    // 'UpdateExpression' defines the attributes to be udpated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":content": data.content ? data.content : null,
      ":attachment": data.attachment ? data.attachment: null
    },
    ReturnValues: "ALL_NEW"
  };
  console.log("Params are: ", params);
  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log("E is: ", e);
    callback(null, failure({ status: false }));
  }

};



