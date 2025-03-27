import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Create Supabase client instance
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Override the default cookie handling logic
  const cookieHandler = {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      } catch (error) {
        // Handle the case where `setAll` is called from a server-side component
        // This can be ignored if middleware is refreshing user sessions
        console.error('Error setting cookies:', error);
      }
    },
  };

  // Return the client and cookieHandler so they can be used elsewhere
  return { supabase, cookieHandler };
};

// Explicitly export the supabase client if needed in other places
export const { supabase, cookieHandler } = createClient(cookies());
