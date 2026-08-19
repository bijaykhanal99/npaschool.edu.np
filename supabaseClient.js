import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sb_publishable_PFPagGtSGkTw4CMTclOQiw_JmmdVhxr'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aXpjdGlic3F5cmdodW5ram5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDIwNTEsImV4cCI6MjEwMjcxODA1MX0.nANHGa40Y8VfPu2KoOFTpbC2trvrGZ_g64qBzkOt800'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
