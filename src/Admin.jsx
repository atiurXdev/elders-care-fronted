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
      fetch('fetch('https://elders-care-backend.onrender.com/api/homes')/api/bookings')
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
      const response = await fetch(`fetch('https://elders-care-backend.onrender.com/api/homes')/api/bookings/${id}`, {
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
      <button onClick={toggleTheme} style={{ position: 'fixed', bottom: '30px', right: '30px', padding: '15px 20px', borderRadius: '30px', background: 'var(--text-main)', color: 'var(--bg-card)', border: 'none', cursor: 'pointer', zIndex: 1000, fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'var(--text-main)', margin: 0 }}>Elder's Care - Admin Panel</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ padding: '10px 15px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>
      <p style={{ color: 'var(--text-muted)' }}>Manage your branch booking requests below.</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: 'var(--bg-card)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#2563eb', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '15px' }}>Date</th>
            <th style={{ padding: '15px' }}>Customer Name</th>
            <th style={{ padding: '15px' }}>Phone Number</th>
            <th style={{ padding: '15px' }}>Branch</th>
            <th style={{ padding: '15px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id} style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
              <td style={{ padding: '15px' }}>{new Date(b.bookingDate).toLocaleDateString()}</td>
              <td style={{ padding: '15px', fontWeight: 'bold' }}>{b.userName}</td>
              <td style={{ padding: '15px' }}>{b.userPhone}</td>
              <td style={{ padding: '15px' }}>{b.branchName}</td>
              <td style={{ padding: '15px' }}>
                <button 
                  onClick={() => handleDelete(b._id)}
                  style={{ padding: '8px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;