import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.VITE_API_URL;
const supabaseKey = process.env.VITE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
