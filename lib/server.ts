import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  const resolvedCookies = await cookieStore; // Resolve the Promise first
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return resolvedCookies.getAll(); // Access cookies after resolving the Promise
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              resolvedCookies.set(name, value, options)
            );
          } catch {
            // Handle the case where `setAll` is called from a Server Component
            // This can be ignored if middleware is refreshing user sessions
          }
        },
      },
    }
  );
};
