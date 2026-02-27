import { useState } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! Main Elder's Care Assistant hoon. Main aapki kya madad kar sakta hoon?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let botResponse = "Aap humein 7908879430 par call kar sakte hain!";
      if(input.toLowerCase().includes("price")) botResponse = "Humare yahan price ₹5999/month se shuru hoti hai.";
      if(input.toLowerCase().includes("location")) botResponse = "Humari branches Kolkata, Siliguri, Asansol, Howrah aur Berhampore mein hain.";
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 2000 }}>
      {isOpen && (
        <div style={{ width: '300px', height: '400px', background: 'var(--bg-card)', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '15px' }}>
          <div style={{ background: '#2563eb', color: 'white', padding: '15px', fontWeight: 'bold' }}>Chat Support</div>
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', background: m.isBot ? 'var(--bg-main)' : '#2563eb', color: m.isBot ? 'var(--text-main)' : 'white', padding: '8px 12px', borderRadius: '10px', maxWidth: '80%', fontSize: '0.9rem' }}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid var(--border-color)', display: 'flex' }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type here..." style={{ flex: 1, border: 'none', background: 'none', color: 'var(--text-main)', outline: 'none' }} />
            <button onClick={handleSend} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#2563eb', color: 'white', border: 'none', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
        {isOpen ? '✖' : '💬'}
      </button>
    </div>
  );
}

export default Chatbot;