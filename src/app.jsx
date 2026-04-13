import React, { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState(null);

  const handleRSVP = (choice) => {
    setStatus(`YOU ARE ${choice.toUpperCase()}! ⚽️`);
    // Logic for Supabase will go here next
  };

  return (
    <div style={{ background: 'black', color: '#00ff66', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', fontStyle: 'italic', marginBottom: '10px' }}>PSG PERTH</h1>
      <div style={{ padding: '10px 20px', border: '1px solid #00ff66', borderRadius: '50px', marginBottom: '40px' }}>
        MATCH CENTRE ONLINE
      </div>

      {status ? (
        <h2 style={{ color: 'white' }}>{status}</h2>
      ) : (
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => handleRSVP('in')} style={{ background: '#00ff66', color: 'black', border: 'none', padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>
            I'M IN
          </button>
          <button onClick={() => handleRSVP('out')} style={{ background: 'transparent', color: '#ff4444', border: '2px solid #ff4444', padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>
            OUT
          </button>
        </div>
      )}
    </div>
  );
}
