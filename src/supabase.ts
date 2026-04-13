import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.https:https://sanymfmppnjbcnokkcxw.supabase.co;
const supabaseAnonKey = import.meta.env.sb_publishable_YaFF-Wzyd2C8RAnk8wVBDw_TxBVr_qd;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
