// app/api/lambda/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

// Call to Amplify deployed Lambda
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // the function name itself must be appended with main
    const command = new InvokeCommand({
      FunctionName: 'amplifyBackendOrchestrator-main',
      Payload: JSON.stringify(body)
    });

    const { Payload } = await new LambdaClient({ region: 'us-west-2' }).send(command);
    const result = JSON.parse(new TextDecoder().decode(Payload));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// // Call to ECR deployed Lambda
// import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const command = new InvokeCommand({
//       FunctionName: process.env.LAMBDA_ARN,
//       Payload: JSON.stringify(body),
//     });
    
//     // Invoke the Lambda function with the command
//     const { Payload } = await new LambdaClient({ region: 'us-west-2' }).send(command);

//     // Parse the Lambda response
//     const result = JSON.parse(new TextDecoder().decode(Payload));

//     // Return the Lambda response
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Error invoking Lambda:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// // Call to mock data. Comment out the mockData you don't want to use
// import fs from 'fs';
// import path from 'path';
// export async function POST(request: NextRequest) {
//   // Simulate some delay to mimic a real Lambda invocation
//   await new Promise(resolve => setTimeout(resolve, 100));

//   // Read the JSON file
//   // const filePath = path.join(process.cwd(), 'public', 'data', 'mockData1.json'); // mock dataset 1: one election, one contest/jurisdiction, WITH picture links
//   const filePath = path.join(process.cwd(), 'public', 'data', 'mockData2.json'); // mock dataset 2: multiple elections, multiple jurisdictions
//   const fileContents = fs.readFileSync(filePath, 'utf8');
//   const data = JSON.parse(fileContents);

//   // You can process the event here if needed
//   const body = await request.json();
//   console.log('Mock Lambda received event:', body);

//   // Return the data as if it was a Lambda response
//   return NextResponse.json({
//     statusCode: 200,
//     body: JSON.stringify(data)
//   });
// }
