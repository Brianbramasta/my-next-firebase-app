// API route for portfolio items
import { NextResponse } from 'next/server';
import { getPortfolioItems, getPortfolioItemById, getPaginatedPortfolioItems } from '@/lib/firebase-service';

/**
 * GET handler for portfolio API
 * Supports:
 * - Get all items: /api/portfolio
 * - Get single item: /api/portfolio?id=<id>
 * - Get paginated items: /api/portfolio?page=<page>&limit=<limit>&category=<category>
 *   - page: Page number (default: 1)
 *   - limit: Items per page (default: 10)
 *   - category: Filter by category (optional)
 */
export async function GET(request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url);
    
    // Check if an ID is provided for a specific portfolio item
    const id = searchParams.get('id');
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');

    if (id) {
      // Fetch a specific portfolio item by ID
      const portfolioItem = await getPortfolioItemById(id);
      return NextResponse.json({ portfolioItem }, { status: 200 });
    } else if (searchParams.has('page') || searchParams.has('limit') || category) {
      // Fetch paginated portfolio items
      const paginatedData = await getPaginatedPortfolioItems(page, limit, category);
      return NextResponse.json(paginatedData, { status: 200 });
    } else {
      // Fetch all portfolio items
      const portfolioItems = await getPortfolioItems();
      return NextResponse.json({ portfolioItems }, { status: 200 });
    }
  } catch (error) {
    console.error('Error in portfolio API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}