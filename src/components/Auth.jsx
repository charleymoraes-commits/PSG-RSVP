import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for sign-in/sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#00ff66] animate-pulse text-4xl font-black italic">PSG PERTH</div>
      </div>
    );
  }

  // If no one is logged in, show the Login (Auth) component
  if (!session) {
    return <Auth />;
  }

  // If logged in, show the Match Centre UI
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-[#00ff66]">
      <h1 className="text-7xl font-black italic tracking-tighter mb-4">PSG PERTH</h1>
      <div className="px-6 py-2 border border-[#00ff66] rounded-full text-[10px] font-bold tracking-[0.3em] mb-12">
        MATCH CENTRE ACTIVE
      </div>
      
      <div className="glass-card p-10 w-full max-w-sm text-center neon-glow">
         <p className="text-white font-bold mb-8 tracking-wide">CONFIRM YOUR ATTENDANCE</p>
         <div className="flex flex-col gap-4">
            <button className="bg-[#00ff66] text-black font-black py-5 rounded-2xl text-2xl hover:scale-[1.02] transition-transform">
              I'M IN
            </button>
            <button className="border-2 border-red-500/50 text-red-500 font-bold py-3 rounded-2xl hover:bg-red-500/10 transition-colors">
              OUT
            </button>
         </div>
      </div>

      <button 
        onClick={() => supabase.auth.signOut()} 
        className="mt-20 text-white/20 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase underline"
      >
        Sign Out
      </button>
    </div>
  );
}
