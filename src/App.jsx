import { useState, useEffect } from 'react';

function App() {
  const [homes, setHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHome, setSelectedHome] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Backend Base URL - Live Render Link
  const API_BASE_URL = 'https://elders-care-backend.onrender.com/api';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Fetching from live Render backend
    fetch(`${API_BASE_URL}/homes`)
      .then(res => res.json())
      .then(data => { 
        if (Array.isArray(data)) setHomes(data); 
      })
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homeId: selectedHome._id,
        branchName: selectedHome.city,
        userName: formData.name,
        userPhone: formData.phone
      })
    })
    .then(res => {
      if(res.ok) {
        alert("Booking Request Sent for " + selectedHome.city);
        setSelectedHome(null);
        setFormData({ name: '', phone: '' });
      }
    })
    .catch(err => console.error("Booking Error:", err));
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div style={{ margin: 0, padding: '40px', backgroundColor: 'var(--bg-main)', minHeight: '100vh', width: '100vw', boxSizing: 'border-box', color: 'var(--text-main)', transition: 'all 0.3s' }}>
      
      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} style={{ position: 'fixed', bottom: '30px', right: '30px', padding: '15px 20px', borderRadius: '30px', background: 'var(--text-main)', color: 'var(--bg-main)', border: 'none', cursor: 'pointer', zIndex: 1000, fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      {/* Header Section */}
      <header style={{ width: '100%', padding: '50px 0', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, color: 'var(--text-main)' }}>Elder's Care</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>"Where Every Smile Tells a Story"</p>
        <input 
          type="text" 
          placeholder="Search city..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '15px 25px', width: '80%', maxWidth: '600px', borderRadius: '30px', border: '2px solid var(--border-color)', marginTop: '20px', fontSize: '1rem', background: 'var(--bg-main)', color: 'var(--text-main)' }}
        />
      </header>

      {/* Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', width: '100%' }}>
        {homes.length === 0 && <p style={{textAlign: 'center', width: '100%'}}>Loading branches...</p>}
        {homes.filter(h => h.city?.toLowerCase().includes(searchTerm.toLowerCase())).map(home => (
          <div key={home._id} style={{ background: 'var(--bg-card)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <img 
              src={home.images[0]} 
              style={{ width: '100%', height: '260px', objectFit: 'cover' }} 
              alt={home.city}
              onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Image+Loading...'; }} 
            />
            <div style={{ padding: '25px' }}>
              <h2 style={{ margin: '0 0 10px 0', color: 'var(--text-main)' }}>{home.city} Branch</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>📍 {home.address}</p>
              <div style={{ background: 'var(--bg-main)', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '1.2rem' }}>₹{home.rooms[0]?.price || 'N/A'}</span>
                <span style={{ color: 'var(--text-muted)' }}> / month</span>
              </div>
              <button onClick={() => setSelectedHome(home)} style={{ width: '100%', padding: '15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedHome && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '20px', width: '400px' }}>
            <h2 style={{ marginTop: 0, color: 'var(--text-main)' }}>Request Visit: {selectedHome.city}</h2>
            <form onSubmit={handleBooking}>
              <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)' }} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="text" placeholder="Phone Number" required style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)' }} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <button type="submit" style={{ width: '100%', padding: '15px', background: '#059669', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Confirm Request</button>
              <button type="button" onClick={() => setSelectedHome(null)} style={{ width: '100%', padding: '10px', background: 'none', border: 'none', color: '#ef4444', marginTop: '10px', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Professional Footer */}
      <footer style={{ 
        marginTop: '50px', 
        padding: '40px 20px', 
        background: 'var(--bg-card)', 
        borderRadius: '20px 20px 0 0', 
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
          <div style={{ textAlign: 'left', minWidth: '200px' }}>
            <h3 style={{ color: '#2563eb' }}>Elder's Care</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Providing a home away from home with love and dignity.</p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Contact Us</h4>
            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>📞 +91 7908879430</p>
            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>📧 atiur332@gmail.com</p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Quick Links</h4>
            <p style={{ margin: '5px 0', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>Back to Top</p>
            <p style={{ margin: '5px 0', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => window.location.href='/admin'}>Admin Login</p>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '20px' }} />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 Elder's Care. All Rights Reserved. Built with ❤️ by Atiur Rahaman.
        </p>
      </footer>

    </div>
  );
}

export default App;