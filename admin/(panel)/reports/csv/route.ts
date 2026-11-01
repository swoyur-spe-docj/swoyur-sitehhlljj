import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { ordersCsv } from '@/lib/repo';

export async function GET() {
  if (!(await isAdmin())) return new NextResponse('Unauthorized', { status: 401 });
  return new NextResponse(await ordersCsv(), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="padmaarc-orders.csv"',
    },
  });
}
