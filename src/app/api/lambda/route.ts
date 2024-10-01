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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Invoke the Lambda function
    const command = new InvokeCommand({
      FunctionName: process.env.LAMBDA_ARN,
      Payload: JSON.stringify(body),
    });

    const { Payload } = await client.send(command);

    // Parse the Lambda response
    const result = JSON.parse(new TextDecoder().decode(Payload));

    // Return the Lambda response
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error invoking Lambda:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}