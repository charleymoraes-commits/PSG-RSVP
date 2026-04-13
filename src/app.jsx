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

  if (loading) return (
    <div style={{ background: 'black', color: '#00ff66', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      LOADING PSG PERTH...
    </div>
  );

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontStyle: 'italic', fontWeight: '900', fontSize: '2.5rem', color: '#00ff66' }}>PSG PERTH</h1>
        {session && (
          <button onClick={() => supabase.auth.signOut()} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={20} />
          </button>
        )}
      </header>
      
      <div style={{ marginTop: '100px', textAlign: 'center', border: '1px solid #333', padding: '60px', borderRadius: '24px', background: '#111' }}>
        <Trophy size={64} color="#00ff66" style={{ marginBottom: '20px' }} />
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Match Centre</h2>
        <p style={{ opacity: 0.6 }}>The pitch is ready. Build successful!</p>
      </div>
    </div>
  );
}
