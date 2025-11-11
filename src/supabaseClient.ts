import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahpkqknlyykescwypdvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocGtxa25seXlrZXNjd3lwZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NzQ3NDgsImV4cCI6MjA3ODM1MDc0OH0.78nSSLTA_uS1WwJg7hOS633ggOvwXT7clE7WtJf-Axs'; // paste your anon public key here

export const supabase = createClient(supabaseUrl, supabaseKey);
