// filepath: /home/omar/omar-portfolio/omar-website/lib/apiHelpers.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from './mongodb'; // Your existing MongoDB connection utility

/**
 * A higher-order function to ensure a database connection is established before running an API route handler.
 * It also includes basic error handling for the connection or handler execution.
 */

// Define a generic type for App Router handlers
// T is the type of the request object (NextRequest or a subtype)
// K is the type of the context/params object (e.g., { params: { id: string } } or undefined)
export type AppRouterHandler<T extends NextRequest, K> = 
  (request: T, context: K) => Promise<NextResponse>;

export function withDb<T extends NextRequest, K>(
  handler: AppRouterHandler<T, K>
): AppRouterHandler<T, K> {
  return async (request, context) => {
    try {
      await dbConnect(); // Ensure DB connection is established and ready
      return await handler(request, context); // Execute the original handler
    } catch (error) {
      console.error("API Route Error (via withDb):\nRequest URL:", request.url, "\nContext:", context, "\nError:", error);

      // Return a generic error response
      // Specific error handling should ideally be within the handler itself if more context is needed
      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
  };
}
