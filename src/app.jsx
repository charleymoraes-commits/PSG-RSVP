import React, { useState } from 'react';
import { supabase } from './supabase.js';

export default function App() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRSVP = async (choice) => {
    setLoading(true);
    // This sends the data to your Supabase 'players' table
    const { error } = await supabase
      .from('players')
      .insert([{ status: choice, timestamp: new Date().toISOString() }]);

    if (!error) {
      setStatus(choice === 'in' ? 'CONVOCADO! ⚽️' : 'FORA DA RODADA ❌');
    } else {
      console.error(error);
      setStatus('ERROR - TRY AGAIN');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: 'black', color: '#00ff66', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '4rem', fontStyle: 'italic', margin: '0', letterSpacing: '-2px' }}>PSG PERTH</h1>
      <div style={{ padding: '8px 20px', border: '1px solid #00ff66', borderRadius: '50px', fontSize: '0.9rem', marginBottom: '60px', letterSpacing: '2px' }}>
        MATCH CENTRE ONLINE
      </div>

      {status ? (
        <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'white' }}>{status}</h2>
          <button onClick={() => setStatus(null)} style={{ background: 'none', border: '1px solid #333', color: '#666', padding: '10px 20px', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}>Change RSVP</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '300px' }}>
          <button 
            disabled={loading}
            onClick={() => handleRSVP('in')} 
            style={{ background: '#00ff66', color: 'black', border: 'none', padding: '20px', fontSize: '1.5rem', fontWeight: '900', cursor: 'pointer', borderRadius: '12px', transition: 'transform 0.1s' }}
          >
            {loading ? 'SENDING...' : "I'M IN"}
          </button>
          <button 
            disabled={loading}
            onClick={() => handleRSVP('out')} 
            style={{ background: 'transparent', color: '#ff4444', border: '2px solid #ff4444', padding: '15px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '12px' }}
          >
            OUT
          </button>
        </div>
      )}
    </div>
  );
}
