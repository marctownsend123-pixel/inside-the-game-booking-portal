'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, CreditCard, ShieldCheck, UserRound, Users, Trophy, Plus, Trash2, CheckCircle2, Settings, ClipboardList } from 'lucide-react';

const sessionTypes = [
  { id: 'one-to-one', name: '1-2-1 Coaching', price: 40, capacity: '1 player', description: 'Individual focus, technical detail and confidence.' },
  { id: 'small-group', name: 'Small Group Session', price: 60, capacity: 'Up to 4 players', description: 'High touches, competition and game realistic detail.' },
  { id: 'group-training', name: 'Group Training', price: 160, capacity: 'Up to 10 players', description: 'Team based learning, decision making and intensity.' }
];

const slots = [
  { id: 1, date: 'Monday 25 May', time: '17:00 - 18:00', spaces: 1 },
  { id: 2, date: 'Tuesday 26 May', time: '18:00 - 19:00', spaces: 4 },
  { id: 3, date: 'Wednesday 27 May', time: '17:00 - 18:00', spaces: 2 },
  { id: 4, date: 'Thursday 28 May', time: '18:00 - 19:00', spaces: 10 },
  { id: 5, date: 'Saturday 30 May', time: '09:00 - 10:00', spaces: 8 },
  { id: 6, date: 'Saturday 30 May', time: '10:00 - 11:00', spaces: 4 }
];

export default function InsideTheGameBookingPortal() {
  const [view, setView] = useState('book');
  const [selectedType, setSelectedType] = useState(sessionTypes[0]);
  const [cart, setCart] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [parent, setParent] = useState({ name: '', email: '', phone: '', player: '', age: '', notes: '' });

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = cart.length >= 4 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const adminStats = useMemo(() => ({ bookings: 24, revenue: 2880, upcoming: cart.length + 8, enquiries: 6 }), [cart.length]);

  function addSlot(slot) {
    setCart([...cart, { ...slot, type: selectedType.name, price: selectedType.price }]);
  }

  function removeItem(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  function confirmBooking() {
    if (!parent.name || !parent.email || !parent.player || cart.length === 0) return;
    setConfirmed(true);
    setView('confirmation');
  }

  return (
    <main className="app">
      <header className="hero">
        <img src="/logo.jpg" alt="Inside the Game logo" className="logo" />
        <div>
          <p className="eyebrow">Web based app for all devices</p>
          <h1>Inside the Game Booking Portal</h1>
          <p className="heroText">Parents can view availability, book sessions, manage player details and prepare payment online.</p>
        </div>
      </header>

      <nav className="tabs">
        <button onClick={() => setView('book')} className={view === 'book' ? 'active' : ''}><CalendarDays size={18} /> Book</button>
        <button onClick={() => setView('checkout')} className={view === 'checkout' ? 'active' : ''}><CreditCard size={18} /> Checkout</button>
        <button onClick={() => setView('parent')} className={view === 'parent' ? 'active' : ''}><UserRound size={18} /> Parent</button>
        <button onClick={() => setView('admin')} className={view === 'admin' ? 'active' : ''}><Settings size={18} /> Admin</button>
      </nav>

      {view === 'book' && (
        <section className="grid two">
          <div className="card">
            <h2>Choose Session Type</h2>
            <div className="sessionList">
              {sessionTypes.map((type) => (
                <button key={type.id} onClick={() => setSelectedType(type)} className={`session ${selectedType.id === type.id ? 'selected' : ''}`}>
                  <div className="icon"><Trophy size={22} /></div>
                  <div>
                    <h3>{type.name}</h3>
                    <p>{type.capacity}</p>
                    <small>{type.description}</small>
                  </div>
                  <strong>£{type.price}</strong>
                </button>
              ))}
            </div>
            <div className="discountBox"><ShieldCheck size={20} /> Book 4 or more sessions and get 10% off automatically.</div>
          </div>

          <div className="card">
            <h2>Available Slots</h2>
            <p className="muted">Selected: {selectedType.name}</p>
            <div className="slotList">
              {slots.map((slot) => (
                <div className="slot" key={slot.id}>
                  <div>
                    <strong>{slot.date}</strong>
                    <p>{slot.time}, {slot.spaces} spaces available</p>
                  </div>
                  <button onClick={() => addSlot(slot)}><Plus size={18} /> Add</button>
                </div>
              ))}
            </div>
            <button className="primary full" onClick={() => setView('checkout')}>Go to Checkout, {cart.length} selected</button>
          </div>
        </section>
      )}

      {view === 'checkout' && (
        <section className="grid two">
          <div className="card">
            <h2>Basket</h2>
            {cart.length === 0 ? <p className="muted">No sessions selected yet.</p> : cart.map((item, index) => (
              <div className="basketItem" key={`${item.id}-${index}`}>
                <div>
                  <strong>{item.type}</strong>
                  <p>{item.date}, {item.time}</p>
                </div>
                <strong>£{item.price}</strong>
                <button className="ghost" onClick={() => removeItem(index)}><Trash2 size={18} /></button>
              </div>
            ))}

            <div className="totalBox">
              <div><span>Subtotal</span><strong>£{subtotal.toFixed(2)}</strong></div>
              <div><span>10% discount, 4+ sessions</span><strong>-£{discount.toFixed(2)}</strong></div>
              <div className="grand"><span>Total</span><strong>£{total.toFixed(2)}</strong></div>
            </div>
          </div>

          <div className="card">
            <h2>Parent & Player Details</h2>
            <div className="form">
              <input placeholder="Parent name" value={parent.name} onChange={(e) => setParent({ ...parent, name: e.target.value })} />
              <input placeholder="Email address" value={parent.email} onChange={(e) => setParent({ ...parent, email: e.target.value })} />
              <input placeholder="Phone number" value={parent.phone} onChange={(e) => setParent({ ...parent, phone: e.target.value })} />
              <input placeholder="Player name" value={parent.player} onChange={(e) => setParent({ ...parent, player: e.target.value })} />
              <input placeholder="Player age" value={parent.age} onChange={(e) => setParent({ ...parent, age: e.target.value })} />
              <textarea placeholder="Medical notes, injuries, allergies or anything the coach should know" value={parent.notes} onChange={(e) => setParent({ ...parent, notes: e.target.value })} />
            </div>
            <div className="paypalBox">
              <strong>PayPal payment</strong>
              <p>Payment instruction will show: send £{total.toFixed(2)} to marc.townsend123@btinternet.com</p>
            </div>
            <a
  className="primary full"
  href={`https://paypal.me/marccharlestownsend/${total.toFixed(2)}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={confirmBooking}
>
  Pay with PayPal
</a></button>
          </div>
        </section>
      )}

      {view === 'confirmation' && confirmed && (
        <section className="card success">
          <CheckCircle2 size={54} />
          <h2>Booking Request Created</h2>
          <p>Prototype confirmation for {parent.player}. Total due: £{total.toFixed(2)}</p>
          <p>Please pay via PayPal to <strong>marc.townsend123@btinternet.com</strong></p>
          <button className="primary" onClick={() => setView('parent')}>Go to Parent Dashboard</button>
        </section>
      )}

      {view === 'parent' && (
        <section className="grid two">
          <div className="card">
            <h2>Parent Dashboard</h2>
            <div className="profile"><UserRound size={32} /><div><strong>{parent.name || 'Parent Name'}</strong><p>{parent.email || 'parent@email.com'}</p></div></div>
            <div className="profile"><Users size={32} /><div><strong>{parent.player || 'Player Name'}</strong><p>Age {parent.age || 'not set'}</p></div></div>
          </div>
          <div className="card">
            <h2>Upcoming Sessions</h2>
            {cart.length === 0 ? <p className="muted">No sessions booked yet.</p> : cart.map((item, index) => (
              <div className="slot" key={index}><div><strong>{item.type}</strong><p>{item.date}, {item.time}</p></div><span className="badge">Pending payment</span></div>
            ))}
          </div>
        </section>
      )}

      {view === 'admin' && (
        <section className="grid two">
          <div className="card">
            <h2>Admin Dashboard</h2>
            <div className="stats">
              <div><p>Total bookings</p><strong>{adminStats.bookings}</strong></div>
              <div><p>Upcoming</p><strong>{adminStats.upcoming}</strong></div>
              <div><p>Monthly revenue</p><strong>£{adminStats.revenue}</strong></div>
              <div><p>New enquiries</p><strong>{adminStats.enquiries}</strong></div>
            </div>
          </div>
          <div className="card">
            <h2><ClipboardList size={22} /> Recent Bookings</h2>
            {[...cart, { type: 'Small Group Session', date: 'Saturday 30 May', time: '10:00 - 11:00', price: 60 }].map((item, index) => (
              <div className="slot" key={index}><div><strong>{item.type}</strong><p>{item.date}, {item.time}</p></div><span className="badge paid">Paid</span></div>
            ))}
          </div>
        </section>
      )}

      <style jsx>{`
        .app { min-height: 100vh; padding: 22px; background: radial-gradient(circle at top, #102434 0, #061017 46%, #02070b 100%); }
        .hero { max-width: 1180px; margin: 0 auto 22px; display: flex; gap: 22px; align-items: center; padding: 22px; border: 1px solid rgba(216,173,79,.35); border-radius: 28px; background: rgba(7,20,29,.8); }
        .logo { width: 128px; height: 128px; object-fit: contain; border-radius: 22px; background: white; padding: 8px; }
        .eyebrow { color: #d8ad4f; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; margin: 0 0 8px; }
        h1 { margin: 0; font-size: clamp(34px, 6vw, 70px); line-height: .95; }
        h2 { margin: 0 0 18px; color: #d8ad4f; display: flex; align-items: center; gap: 8px; }
        h3, p { margin: 0; }
        .heroText, .muted { color: #b9c2c9; margin-top: 10px; }
        .tabs { max-width: 1180px; margin: 0 auto 22px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .tabs button, .primary, .slot button { border: 0; border-radius: 16px; background: #132532; color: white; padding: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .tabs .active, .primary, .slot button { background: #d8ad4f; color: #061017; }
        .grid { max-width: 1180px; margin: 0 auto; display: grid; gap: 20px; }
        .two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .card { border: 1px solid rgba(216,173,79,.35); border-radius: 28px; background: rgba(11,24,34,.92); padding: 22px; box-shadow: 0 20px 60px rgba(0,0,0,.28); }
        .sessionList, .slotList, .form { display: grid; gap: 12px; }
        .session { width: 100%; border: 1px solid transparent; border-radius: 20px; background: white; color: #061017; padding: 16px; display: grid; grid-template-columns: auto 1fr auto; gap: 14px; text-align: left; align-items: center; }
        .session.selected { border-color: #d8ad4f; box-shadow: 0 0 0 3px rgba(216,173,79,.25); }
        .session p, .session small { color: #4b5563; }
        .icon { width: 48px; height: 48px; border-radius: 999px; display: grid; place-items: center; background: #d8ad4f; }
        .discountBox, .paypalBox { margin-top: 18px; border: 1px solid rgba(216,173,79,.35); border-radius: 18px; padding: 14px; color: #d8ad4f; display: flex; gap: 10px; align-items: center; background: rgba(216,173,79,.08); }
        .paypalBox { display: block; color: white; }
        .paypalBox p { color: #c7d0d7; margin-top: 6px; }
        .slot, .basketItem, .profile { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px; border-radius: 18px; background: #132532; margin-bottom: 10px; }
        .slot p, .basketItem p, .profile p { color: #b9c2c9; margin-top: 4px; }
        .full { width: 100%; margin-top: 14px; }
        .basketItem { display: grid; grid-template-columns: 1fr auto auto; }
        .ghost { background: transparent; color: white; border: 0; }
        .totalBox { margin-top: 18px; background: #d8ad4f; color: #061017; border-radius: 20px; padding: 18px; }
        .totalBox div { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .totalBox .grand { border-top: 1px solid rgba(0,0,0,.25); padding-top: 12px; margin-top: 12px; font-size: 24px; }
        input, textarea { width: 100%; background: #07141d; border: 1px solid rgba(255,255,255,.12); color: white; border-radius: 14px; padding: 14px; }
        textarea { min-height: 100px; resize: vertical; }
        .success { max-width: 720px; margin: 0 auto; text-align: center; }
        .success svg { color: #d8ad4f; }
        .badge { background: rgba(216,173,79,.15); color: #d8ad4f; padding: 8px 10px; border-radius: 999px; font-size: 13px; font-weight: 800; }
        .badge.paid { color: #8ee28e; background: rgba(80,200,120,.14); }
        .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .stats div { background: #132532; border-radius: 18px; padding: 18px; }
        .stats p { color: #b9c2c9; }
        .stats strong { font-size: 32px; display: block; margin-top: 8px; }
        @media (max-width: 820px) { .hero { flex-direction: column; text-align: center; } .two, .tabs { grid-template-columns: 1fr; } .logo { width: 110px; height: 110px; } .app { padding: 12px; } }
      `}</style>
    </main>
  );
}
