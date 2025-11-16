import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { CarsGrid } from './components/CarsGrid';
import { Auth } from './components/Auth';
import './App.css';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="app-container">
      <div style={{ 
        padding: '12px 20px', 
        textAlign: 'right', 
        background: '#fff',
        borderBottom: '1px solid #e6e6e9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: '#666', fontSize: '14px' }}>
          {session.user.email}
        </span>
        <button 
          onClick={() => supabase.auth.signOut()} 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}
        >
          Sign Out
        </button>
      </div>
      <CarsGrid />
    </div>
  );
}

export default App;
