import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
VITE_SUPABASE_URL=sb_publishable_PFPagGtSGkTw4CMTcl0Qiw_JmmdVhxr
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aXpjdGlic3F5cmdodW5ram5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDIwNTEsImV4cCI6MjEwMjcxODA1MX0.nANHGa40Y8VfPu2KoOFTpbC2trvrGZ_g64qBzkOt800
