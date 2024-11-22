import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and public API key
const SUPABASE_URL = 'https://gqsmzecblpcsjnvssulo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxc216ZWNibHBjc2pudnNzdWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzI3NjcsImV4cCI6MjAzOTY0ODc2N30.cI8grdYrSH7JjdrOzJP9Zvc6LO4ogpqATbYXUnYPMx4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

