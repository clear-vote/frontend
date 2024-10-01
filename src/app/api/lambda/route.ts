import { NextRequest, NextResponse } from 'next/server';
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