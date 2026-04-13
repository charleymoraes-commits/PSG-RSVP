import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { Trophy, LogOut } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-green-400 font-bold">LOADING PSG PERTH...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black italic">PSG PERTH</h1>
        {session && (
          <button onClick={() => supabase.auth.signOut()} className="text-red-500 flex items-center gap-2">
            <LogOut size={20} /> Logout
          </button>
        )}
      </header>
      
      <div className="max-w-2xl mx-auto text-center py-20 border border-white/10 rounded-3xl bg-white/5">
        <Trophy className="mx-auto mb-6 text-green-400" size={64} />
        <h2 className="text-2xl font-bold mb-4">Match Centre</h2>
        <p className="text-gray-400">The pitch is being prepared. Check back soon for the next kickoff!</p>
      </div>
    </div>
  );
}
