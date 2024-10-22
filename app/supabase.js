import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://txdtlifaiioinhwcsfty.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZHRsaWZhaWlvaW5od2NzZnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4ODYxNjIsImV4cCI6MjA0MzQ2MjE2Mn0.lM30vqrZlkbBhStdGSZQ5sYXPPvjtNRaAnUkzJ8t_pY";


export const supabase = createClient(supabaseUrl,supabaseAnonKey)