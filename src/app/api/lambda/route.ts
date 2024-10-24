// app/api/lambda/route.ts
import { NextRequest, NextResponse } from 'next/server';

const getDataFromApi = async (latitude: string, longitude: string) => {
  // For server-side code, use process.env directly
  const baseUrl = process.env.BACKEND_ORCHESTRATOR_API_URL;
  
  if (!baseUrl) {
    throw new Error('API URL not configured');
  }

  // Construct the full URL with query parameters
  const apiUrl = `${baseUrl}?latitude=${latitude}&longitude=${longitude}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    
    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Call getDataFromApi and get the result directly
    const result = await getDataFromApi(latitude, longitude);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error invoking API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

// Call to mock data. Comment out the mockData you don't want to use
// import fs from 'fs';
// import { NextRequest, NextResponse } from 'next/server';
// import path from 'path';

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const latitude = searchParams.get('latitude');
//     const longitude = searchParams.get('longitude');
    
//     if (!latitude || !longitude) {
//       return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
//     }

//     // Simulate some delay to mimic a real API call
//     await new Promise(resolve => setTimeout(resolve, 100));

//     // Read the JSON file
//     // const filePath = path.join(process.cwd(), 'public', 'data', 'mockData1.json'); // mock dataset 1: one election, one contest/jurisdiction, WITH picture links
//     const filePath = path.join(process.cwd(), 'public', 'data', 'mockData2.json'); // mock dataset 2: multiple elections, multiple jurisdictions
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const data = JSON.parse(fileContents);

//     // Log the received parameters (similar to logging the event in the original code)
//     console.log('Mock API received parameters:', { latitude, longitude });

//     return NextResponse.json(data);
//   } catch (error: any) {
//     console.error('Error in mock API:', error);
//     return NextResponse.json(
//       { error: 'Internal Server Error', details: error.message },
//       { status: 500 }
//     );
//   }
// }