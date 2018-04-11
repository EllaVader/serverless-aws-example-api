import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  console.log("event is:", event);

  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be removed.
    // - 'userId' : Identity Pool identiy id of the authenticated user
    // - 'noteId' : path paramter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  console.log("Params", params);

  try {
    const result = await dynamoDbLib.call("delete", params);
    callback(null, success({ status: true}));
  } catch(e){
    console.log("E", e);
    callback(null, failure({ status: false }));
  }
}