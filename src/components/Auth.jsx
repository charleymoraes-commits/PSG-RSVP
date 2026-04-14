import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { LogIn, UserPlus, Mail, Lock, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card neon-border w-full max-w-md p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pitch/10 text-pitch mb-6 neon-glow">
          <ShieldCheck size={32} />
        </div>
        
        <h1 className="text-3xl font-black italic text-white mb-2">PSG PERTH</h1>
        <p className="text-white/40 mb-8 uppercase tracking-widest text-xs font-bold">Match Centre Access</p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-pitch/50 focus:ring-0 transition-all"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-pitch/50 focus:ring-0 transition-all"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm font-medium bg-red-500/10 py-2 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pitch hover:bg-pitch-dark text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,255,102,0.2)]"
          >
            {loading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN')}
            {isSignUp ? <UserPlus size={18} /> : <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-6 text-white/40 hover:text-white text-sm font-bold transition-colors uppercase tracking-wider"
        >
          {isSignUp ? 'Already have access? Sign In' : 'Request Access? Sign Up'}
        </button>
      </motion.div>
    </div>
  );
}
