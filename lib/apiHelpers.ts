// filepath: /home/omar/omar-portfolio/omar-website/lib/apiHelpers.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from './mongodb'; // Your existing MongoDB connection utility

/**
 * A higher-order function to ensure a database connection is established before running an API route handler.
 * It also includes basic error handling for the connection or handler execution.
 */

// P represents the actual parameters type, e.g., { id: string }
// This type defines the structure of the second argument for Next.js 15 async route handlers.
export type NextRouteContext<P extends Record<string, string | string[]> = any> = {
  params: Promise<P>; // params is a Promise
};

// AppRouterHandler now uses NextRouteContext for its second parameter.
// P_ContextParams is the type of the resolved params, e.g., { id: string }
export type AppRouterHandler<
  T extends NextRequest,
  P_ContextParams extends Record<string, string | string[]>
> = (
  request: T,
  context: NextRouteContext<P_ContextParams> // The context object itself, containing params as a Promise
) => Promise<NextResponse>;

export function withDb<
  T extends NextRequest,
  P_ContextParams extends Record<string, string | string[]>
>(
  handler: AppRouterHandler<T, P_ContextParams>
): AppRouterHandler<T, P_ContextParams> {
  return async (request, context) => {
    try {
      await dbConnect();
      return await handler(request, context);
    } catch (error) {
      // Log context information carefully
      console.error(
        "API Route Error (via withDb):\nRequest URL:",
        request.url,
        "\nContext params type: Promise<params>", // Indicate params is a Promise
        "\nError:",
        error
      );

      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      // Ensure a NextResponse is always returned
      return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
  };
}
