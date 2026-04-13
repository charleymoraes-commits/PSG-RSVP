import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Profile } from './types';
import Auth from './components/Auth';
import UpdatePassword from './components/UpdatePassword';
import MatchView from './components/MatchView';
import HistoryView from './components/HistoryView';
import AdminView from './components/AdminView';
import PublicGameView from './components/PublicGameView';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, History, ShieldAlert, LogOut, RefreshCw } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'match' | 'history' | 'admin'>('match');
  const [loading, setLoading] = useState(true);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Handle Public Route (/match/:id)
  const path = window.location.pathname;
  const isPublicRoute = path.startsWith('/match/');
  const publicGameId = isPublicRoute ? path.split('/')[2] : null;

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setIsResettingPassword(true);
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-pitch animate-pulse text-4xl font-black italic">PSG PERTH</div></div>;
  if (isResettingPassword) return <UpdatePassword onComplete={() => setIsResettingPassword(false)} />;
  if (isPublicRoute && publicGameId) return <PublicGameView gameId={publicGameId} />;
  if (!session) return <Auth />;

  return (
    <div className="min-h-screen bg-black pb-24 md:pb-0 md:pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl md:text-2xl font-black italic text-white">PSG PERTH</div>
          <nav
