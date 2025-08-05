import { NextResponse } from 'next/server';
import { getPortfolioCategories } from '@/lib/firebase-service';

/**
 * GET handler for portfolio categories API
 * Returns all unique categories used in portfolio items
 */
export async function GET() {
  try {
    const categories = await getPortfolioCategories();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error in portfolio categories API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio categories' },
      { status: 500 }
    );
  }
}
