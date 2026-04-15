import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldCheck, Mail, Lock, LogIn } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Try sign in
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      // If user doesn't exist, try sign up
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) alert(signUpError.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-[#00ff66]">
      <div className="max-w-md w-full glass-card p-10 text-center neon-glow">
        <div className="w-16 h-16 bg-[#00ff66]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-4xl font-black italic mb-2 tracking-tighter text-white">PSG PERTH</h1>
        <p className="text-white/40 text-[10px] tracking-[0.3em] font-bold mb-10 uppercase">Match Centre Access</p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" size={18} />
            <input 
              type="email" 
              placeholder="EMAIL" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white placeholder:text-white/20 focus:border-[#00ff66]/50 outline-none transition-all" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" size={18} />
            <input 
              type="password" 
              placeholder="PASSWORD" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white placeholder:text-white/20 focus:border-[#00ff66]/50 outline-none transition-all" 
            />
          </div>
          <button className="w-full bg-[#00ff66] text-black font-black py-4 rounded-2xl shadow-[0_0_30px_rgba(0,255,102,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            {loading ? 'PROCESSING...' : 'ENTER CENTRE'} <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
