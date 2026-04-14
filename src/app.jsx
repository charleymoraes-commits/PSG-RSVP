import React, { useState } from 'react';
import { supabase } from './supabase.js';

export default function App() {
  const [user, setUser] = useState(null); // This tracks if someone "logged in"
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);

  const handleRSVP = async (choice) => {
    const { error } = await supabase
      .from('players')
      .insert([{ name: user, status: choice }]); // Now it saves THEIR name

    if (!error) setStatus(choice === 'in' ? 'CONVOCADO! ⚽️' : 'OUT');
  };

  // 🏟️ THE LOGIN VIEW
  if (!user) {
    return (
      <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#00ff66', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontStyle: 'italic', fontSize: '3rem' }}>PSG PERTH</h1>
        <p style={{ color: 'white', marginBottom: '20px' }}>ENTER YOUR NAME TO ACCESS</p>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Squad Name..."
          style={{ background: '#111', border: '1px solid #00ff66', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px', width: '250px' }}
        />
        <button 
          onClick={() => user === '' ? null : setUser(name)}
          style={{ background: '#00ff66', color: 'black', border: 'none', padding: '15px 30px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
        >
          ENTER MATCH CENTRE
        </button>
      </div>
    );
  }

  // 🏟️ THE RSVP VIEW (What you see in your screenshot)
  return (
    <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       {/* All your existing button code goes here */}
       <h1 style={{ color: '#00ff66', fontStyle: 'italic' }}>PSG PERTH</h1>
       <p style={{ color: 'white' }}>WELCOME, {user.toUpperCase()}</p>
       {/* ... (buttons) ... */}
    </div>
  );
}
