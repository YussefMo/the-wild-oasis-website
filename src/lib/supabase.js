import { createClient } from '@supabase/supabase-js';

export const urlSupabase = process.env.SUPABASE_URL
export const keySupabase = process.env.SUPABASE_ANON_KEY

const supabase = createClient(urlSupabase, keySupabase);

export default supabase;
