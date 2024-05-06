import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_API_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;
console.log(supabaseUrl);
console.log("00000000000");
console.log(supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
