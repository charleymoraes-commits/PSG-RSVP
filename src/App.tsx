import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import Auth from './components/Auth';
import MatchView from './components/MatchView';
import HistoryView from './components/HistoryView';
import AdminView from './components/AdminView';
import PublicGameView from './components/PublicGameView';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, History, ShieldAlert, LogOut, RefreshCw } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'match' | 'history' | 'admin'>('match');
  const [loading, setLoading] = useState(true);

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-pitch animate-pulse">PSG PERTH</div>;
  if (isPublicRoute && publicGameId) return <PublicGameView gameId={publicGameId} />;
  if (!session) return <Auth />;

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black italic text-white">PSG PERTH</div>
          <nav className="hidden md:flex gap-1 bg-white/5 p-1 rounded-xl">
            <button onClick={() => setActiveTab('match')} className={cn("px-6 py-2 rounded-lg font-bold text-sm", activeTab === 'match' ? "bg-white text-black" : "text-white/60")}>Match</button>
            <button onClick={() => setActiveTab('history')} className={cn("px-6 py-2 rounded-lg font-bold text-sm", activeTab === 'history' ? "bg-white text-black" : "text-white/60")}>History</button>
            {profile?.is_admin && <button onClick={() => setActiveTab('admin')} className={cn("px-6 py-2 rounded-lg font-bold text-sm", activeTab === 'admin' ? "bg-white text-black" : "text-white/60")}>Admin</button>}
          </nav>
          <button onClick={() => supabase.auth.signOut()} className="text-white/40 hover:text-red-500"><LogOut size={20} /></button>
        </div>
      </header>
      <main className="p-6 max-w-6xl mx-auto mt-20">
        {activeTab === 'match' && <MatchView user={session.user} profile={profile} />}
        {activeTab === 'history' && <HistoryView user={session.user} />}
        {activeTab === 'admin' && <AdminView />}
      </main>
    </div>
  );
}
