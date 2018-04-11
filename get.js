import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main (event, context, callback) {

  console.log("Event.pathParameters", event.pathParameters);
  //console.log("Context", context);
  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId' : Identity Pool identity id of the authenticated user
    // - 'noteId' : path paramter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  console.log("PARAMS ARE: ", params)

  try {
    const result = await dynamoDbLib.call('get', params);
    //console.log("RESULT: ", result);
    if(result.Item) {
      // return the retreived item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item not found.'}));
    }
  } catch(e){
    console.log("E: ", e);
    callback(null, failure({ status: false }));
  }
}