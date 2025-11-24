import { createClient } from "@supabase/supabase-js";

export const supabaseNotes = createClient(
  import.meta.env.VITE_NOTES_SUPABASE_URL,
  import.meta.env.VITE_NOTES_SUPABASE_ANON_KEY
);
