import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// Configure the Lambda client
const client = new LambdaClient({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

// // Call to REAL Lambda
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Invoke the Lambda function
//     const command = new InvokeCommand({
//       FunctionName: process.env.LAMBDA_ARN,
//       Payload: JSON.stringify(body),
//     });

//     const { Payload } = await client.send(command);

//     // Parse the Lambda response
//     const result = JSON.parse(new TextDecoder().decode(Payload));

//     // Return the Lambda response
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Error invoking Lambda:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// Call to mock lambda
import fs from 'fs';
import path from 'path';
export async function POST(request: NextRequest) {
  // Simulate some delay to mimic a real Lambda invocation
  await new Promise(resolve => setTimeout(resolve, 100));

  // Read the JSON file
  const filePath = path.join(process.cwd(), 'public', 'data', 'electionFoo.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  // You can process the event here if needed
  const body = await request.json();
  console.log('Mock Lambda received event:', body);

  // Return the data as if it was a Lambda response
  return NextResponse.json({
    statusCode: 200,
    body: JSON.stringify(data)
  });
}
