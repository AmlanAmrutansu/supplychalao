import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// For development, provide fallback values to prevent crashes
const defaultUrl = supabaseUrl || "https://placeholder.supabase.co"
const defaultKey = supabaseAnonKey || "placeholder-key"

// Create client with fallback values
export const supabase = createClient(defaultUrl, defaultKey)

// Check if properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co")
}

// Client-side singleton
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(defaultUrl, defaultKey)
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
