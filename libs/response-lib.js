export const success = (body) => {
  return buildResponse(200, body);
}

export const failure = (body) => {
  return buildResponse(500, body);
}
// JSON.stringify converts Javascript value into a JSON string. (conver JSON into string)
// JSON.parse parses a JSON string constructing the Javascript value or object described by the stirng.  (convert string to JSON)
const buildResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}