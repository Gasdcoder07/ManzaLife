import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eoajugkucnfoesuuiznu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYWp1Z2t1Y25mb2VzdXVpem51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MzE2MjAsImV4cCI6MjA4OTEwNzYyMH0.2oem4ZHLZ6v2_yP_67mk3czApHEXGJs1cFK9ez9FxA4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
