import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://kfxzmhlzyzvlsurewomx.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmeHptaGx6eXp2bHN1cmV3b214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzAxODUsImV4cCI6MjA2OTEwNjE4NX0.1rbX8FrzdiRP7JIUNTNvDKnWRKytINkgpDLjSyPxJTk"

// Create client with fixed values
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co")
}

// Client-side singleton
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Safe client that checks configuration
export const getSafeSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not properly configured. Please check your environment variables.")
  }
  return supabase
}
