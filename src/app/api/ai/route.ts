import { NextRequest, NextResponse } from 'next/server';
import { generateAI } from '@/utils/ai';

export async function POST(req: NextRequest) {
  try {
    const { agentType, inputData } = await req.json();
    if (!agentType) {
      return NextResponse.json({ success: false, error: 'agentType is required' }, { status: 400 });
    }
    const result = await generateAI(agentType, inputData);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
