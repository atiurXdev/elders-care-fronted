import { useState, useEffect } from 'react';

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      // FIXED: Removed extra fetch text and quotes
      fetch('https://elders-care-backend.onrender.com/api/bookings')
        .then(res => res.json())
        .then(data => setBookings(data));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "atiur2026") {
      setIsAuthenticated(true);
    } else {
      alert("Access Denied: Incorrect Password");
      setPassword("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      // FIXED: Removed backticks and extra fetch text
      const response = await fetch(`https://elders-care-backend.onrender.com/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b._id !== id));
      } else {
        alert("Failed to delete booking.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)', fontFamily: 'sans-serif', transition: 'all 0.3s' }}>
        <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-main)', margin: '0 0 20px 0' }}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter PIN" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '2px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', textAlign: 'center', letterSpacing: '3px' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
        <button onClick={toggleTheme} style={{ position: 'fixed', bottom: '30px', right: '30px', padding: '15px 20px', borderRadius: '30px', background: 'var(--text-main)', color: 'var(--bg-card)', border: 'none', cursor: 'pointer', zIndex: 1000, fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', color: 'var(--text-main)', minHeight: '100vh', background: 'var(--bg-main)', transition: 'all 0.3s' }}>
      <button onClick={toggleTheme} style={{ position: 'fixed', bottom: '30px', right: '30px', padding: '15px 20px', borderRadius: '30px', background: 'var(--text-main)', color: 'var(--bg-card)', border: 'none', cursor: 'pointer', zIndex: 1000, fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0