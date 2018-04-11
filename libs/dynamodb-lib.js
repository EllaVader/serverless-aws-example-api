import AWS from 'aws-sdk';

// define the region while we connect to DynamoDB
AWS.config.update({
  region: "us-east-1"
});

// make the dynamoDB call passing in the type of request action i.e. put, get, query and the request parameters
// in the form of an object
// the call is a promise 
export const call = (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
}