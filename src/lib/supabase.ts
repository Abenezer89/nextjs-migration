import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzlkcpehfaoyylddfbrr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bGtjcGVoZmFveXlsZGRmYnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTQ0NTcsImV4cCI6MjA1NzI3MDQ1N30.HL0J-b0G9GeYdTlYOXidK5WyojHeREuZiPIwcnWGk1w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'job_seeker' | 'employer';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: 'job_seeker' | 'employer';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'job_seeker' | 'employer';
          created_at?: string;
          updated_at?: string;
        };
      };
      job_seeker_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          bio: string | null;
          skills: string[] | null;
          experience: string[] | null;
          education: string[] | null;
          resume_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          experience?: string[] | null;
          education?: string[] | null;
          resume_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          experience?: string[] | null;
          education?: string[] | null;
          resume_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      company_profiles: {
        Row: {
          id: string;
          company_name: string;
          description: string | null;
          industry: string | null;
          location: string | null;
          website: string | null;
          logo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          company_name: string;
          description?: string | null;
          industry?: string | null;
          location?: string | null;
          website?: string | null;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          description?: string | null;
          industry?: string | null;
          location?: string | null;
          website?: string | null;
          logo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}; 