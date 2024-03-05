import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxcilyklilircvniheka.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2lseWtsaWxpcmN2bmloZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0Nzc1NjUsImV4cCI6MjAyNTA1MzU2NX0.RszU2goyryyQecn8v0soAvQWsmi0puZXo4x8cSpLWus';
export default createClient(supabaseUrl, supabaseKey);
