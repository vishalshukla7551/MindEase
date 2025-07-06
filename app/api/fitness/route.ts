import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch('https://stopwatch-measure.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error); 
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
