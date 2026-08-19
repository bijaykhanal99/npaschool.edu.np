import { createClient } from '@supabase/supabase-js'

// URL मा परियोजनाको Subdomain हुनुपर्छ
const supabaseUrl = 'https://uvizctibsqyrghunkjnk.supabase.co'

// यहाँ तपाईंको फोटोमा देखिएको Publishable Key वा Legacy Anon Key राख्नुहोस्
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2aXpjdGlic3F5cmdodW5ram5rIiwicm9sZSI6ImFub24i'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
