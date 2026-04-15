import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// SAFE MODE CONNECTION
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [user, setUser] = useState(localStorage.getItem('psg_name') || '');
  const [inputName, setInputName] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!inputName.trim()) return;
    localStorage.setItem('psg_name', inputName);
    setUser(inputName);
  };

  const handleRSVP = async (choice) => {
    setLoading(true);
    const { error } = await supabase
      .from('players') 
      .insert([{ name: user, status: choice }]);

    if (!error) {
      setStatus(choice === 'in' ? 'CONVOCADO! ⚽️' : 'FORA DA RODADA');
    } else {
      alert("Database Error: Check your Supabase RLS settings!");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#00ff66', fontFamily: 'sans-serif', padding: '20px' }}>
        <h1 style={{ fontStyle: 'italic', fontSize: '4rem', margin: '0', fontWeight: '900', letterSpacing: '-2px' }}>PSG PERTH</h1>
        <p style={{ color: 'white', marginBottom: '40px', letterSpacing: '3px', fontSize: '0.8rem', opacity: 0.6 }}>MATCH CENTRE ACCESS</p>
        <input 
          value={inputName} 
          onChange={(e) => setInputName(e.target.value)} 
          placeholder="ENTER SQUAD NAME..." 
          style={{ background: '#111', border: '1px solid #00ff66', color: 'white', padding: '20px', borderRadius: '12px', width: '100%', maxWidth: '300px', marginBottom: '15px', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }} 
        />
        <button onClick={handleLogin} style={{ background: '#00ff66', color: 'black', border: 'none', padding: '18px 60px', fontWeight: '900', borderRadius: '12px', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 0 20px rgba(0,255,102,0.3)' }}>
          ENTER
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#00ff66', fontStyle: 'italic', fontSize: '4.5rem', margin: '0', fontWeight: '900', letterSpacing: '-3px' }}>PSG PERTH</h1>
      <div style={{ padding: '6px 20px', border: '1px solid #00ff66', borderRadius: '50px', color: '#00ff66', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '60px' }}>
        MATCH CENTRE ONLINE
      </div>

      {status ? (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '900', fontStyle: 'italic' }}>{status}</h2>
          <button onClick={() => setStatus(null)} style={{ background: 'none', border: 'none', color: '#444', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Change Status</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '320px' }}>
          <button 
            disabled={loading}
            onClick={() => handleRSVP('in')} 
            style={{ background: '#00ff66', color: 'black', border: 'none', padding: '25px', fontSize: '1.8rem', fontWeight: '900', borderRadius: '16px', cursor: 'pointer' }}
          >
            {loading ? '...' : "I'M IN"}
          </button>
          <button 
            disabled={loading}
            onClick={() => handleRSVP('out')} 
            style={{ background: 'transparent', color: '#ff4444', border: '2px solid #ff4444', padding: '18px', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '16px', cursor: 'pointer' }}
          >
            OUT
          </button>
        </div>
      )}
      <p style={{ marginTop: '60px', color: '#333', fontSize: '0.8rem', fontWeight: 'bold' }}>LOGGED IN AS: {user.toUpperCase()}</p>
    </div>
  );
}
