import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// DATABASE CONNECTION
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function App() {
  const [user, setUser] = useState(localStorage.getItem('psg_name') || '');
  const [inputName, setInputName] = useState('');
  const [status, setStatus] = useState(null);

  const handleLogin = () => {
    localStorage.setItem('psg_name', inputName);
    setUser(inputName);
  };

  const handleRSVP = async (choice) => {
    const { error } = await supabase.from('players').insert([{ name: user, status: choice }]);
    if (!error) setStatus(choice === 'in' ? 'CONVOCADO! ⚽️' : 'OUT');
    else alert("Database Error: Check your Supabase RLS settings!");
  };

  if (!user) {
    return (
      <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#00ff66', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontStyle: 'italic', fontSize: '3rem', margin: 0 }}>PSG PERTH</h1>
        <p style={{ color: 'white', marginBottom: '30px', letterSpacing: '2px' }}>MATCH CENTRE ACCESS</p>
        <input value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Your Name..." style={{ background: '#111', border: '1px solid #00ff66', color: 'white', padding: '15px', borderRadius: '12px', width: '250px', marginBottom: '15px', textAlign: 'center' }} />
        <button onClick={handleLogin} style={{ background: '#00ff66', color: 'black', border: 'none', padding: '15px 40px', fontWeight: '900', borderRadius: '12px', cursor: 'pointer' }}>ENTER</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ff66', fontStyle: 'italic', fontSize: '3.5rem', margin: 0 }}>PSG PERTH</h1>
      <p style={{ color: 'white', letterSpacing: '3px', marginBottom: '50px' }}>WELCOME, {user.toUpperCase()}</p>
      
      {status ? (
        <h2 style={{ color: '#00ff66', fontSize: '2rem' }}>{status}</h2>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '280px' }}>
          <button onClick={() => handleRSVP('in')} style={{ background: '#00ff66', color: 'black', border: 'none', padding: '20px', fontSize: '1.5rem', fontWeight: '900', borderRadius: '15px', cursor: 'pointer' }}>I'M IN</button>
          <button onClick={() => handleRSVP('out')} style={{ background: 'transparent', color: '#ff4444', border: '2px solid #ff4444', padding: '15px', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '15px', cursor: 'pointer' }}>OUT</button>
        </div>
      )}
    </div>
  );
}
