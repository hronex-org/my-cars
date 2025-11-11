import React, { useState } from 'react';
import './Login.css';
import { supabase } from '../supabaseClient';

interface Props {
  onLoginSuccess: () => void;
}

export const Login = ({ onLoginSuccess }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log('Attempting login with email:', username);
      // Sign in with Supabase using email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        setError(`Napaka: ${error.message}`);
      } else if (data.user) {
        // Set local storage flags for authentication
        localStorage.setItem('auth', '1');
        localStorage.setItem('auth_user', username);
        onLoginSuccess();
      } else {
        setError('Nepravilen uporabniški podatki');
      }
    } catch (e) {
      console.error('Login error:', e);
      setError('Napaka pri povezavi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <form className="login-form" onSubmit={submit}>
        <h2>Prijava</h2>
        {error && <div className="login-error">{error}</div>}
        <label>
          Uporabnik
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Geslo
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="login-actions">
          <button type="submit" disabled={loading}>{loading ? 'Prijavljam...' : 'Prijava'}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;