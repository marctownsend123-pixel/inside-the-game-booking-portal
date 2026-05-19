```jsx
'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, CreditCard, ShieldCheck, UserRound, Users, Trophy, Plus, Trash2, CheckCircle2, Settings, ClipboardList } from 'lucide-react';

const sessionTypes = [
  { id: 'one-to-one', name: '1-2-1 Coaching', price: 40, capacity: '1 player' },
  { id: 'small-group', name: 'Small Group Session', price: 60, capacity: 'Up to 4 players' },
  { id: 'group-training', name: 'Group Training', price: 160, capacity: 'Up to 10 players' }
];

const slots = [
  { id: 1, date: 'Monday 25 May', time: '17:00 - 18:00', spaces: 1 },
  { id: 2, date: 'Tuesday 26 May', time: '18:00 - 19:00', spaces: 4 },
  { id: 3, date: 'Wednesday 27 May', time: '17:00 - 18:00', spaces: 2 },
  { id: 4, date: 'Thursday 28 May', time: '18:00 - 19:00', spaces: 10 }
];

export default function InsideTheGameBookingPortal() {
  const [view, setView] = useState('book');
  const [selectedType, setSelectedType] = useState(sessionTypes[0]);
  const [cart, setCart] = useState([]);
  const [parent, setParent] = useState({
    name: '',
    email: '',
    player: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = cart.length >= 4 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const adminStats = useMemo(() => ({
    bookings: 24,
    revenue: 2880,
    upcoming: cart.length + 8
  }), [cart.length]);

  function addSlot(slot) {
    setCart([
      ...cart,
      {
        ...slot,
        type: selectedType.name,
        price: selectedType.price
      }
    ]);
  }

  function removeItem(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  return (
    <main className="app">

      <header className="hero">
        <img src="/logo.jpg" alt="Inside the Game" className="logo" />

        <div>
          <p className="eyebrow">Web based app for all devices</p>
          <h1>Inside the Game Booking Portal</h1>
          <p className="heroText">
            Book coaching sessions, manage players and pay online.
          </p>
        </div>
      </header>

      <nav className="tabs">
        <button onClick={() => setView('book')} className={view === 'book' ? 'active' : ''}>
          <CalendarDays size={18} />
          Book
        </button>

        <button onClick={() => setView('checkout')} className={view === 'checkout' ? 'active' : ''}>
          <CreditCard size={18} />
          Checkout
        </button>

        <button onClick={() => setView('parent')} className={view === 'parent' ? 'active' : ''}>
          <UserRound size={18} />
          Parent
        </button>

        <button onClick={() => setView('admin')} className={view === 'admin' ? 'active' : ''}>
          <Settings size={18} />
          Admin
        </button>
      </nav>

      {view === 'book' && (
        <section className="grid two">

          <div className="card">
            <h2>Select Session Type</h2>

            <div className="sessionList">
              {sessionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`session ${selectedType.id === type.id ? 'selected' : ''}`}
                >
                  <div>
                    <h3>{type.name}</h3>
                    <p>{type.capacity}</p>
                  </div>

                  <strong>£{type.price}</strong>
                </button>
              ))}
            </div>

            <div className="discountBox">
              <ShieldCheck size={18} />
              Book 4+ sessions and get 10% off automatically.
            </div>
          </div>

          <div className="card">
            <h2>Available Slots</h2>

            {slots.map((slot) => (
              <div className="slot" key={slot.id}>
                <div>
                  <strong>{slot.date}</strong>
                  <p>{slot.time}</p>
                </div>

                <button onClick={() => addSlot(slot)}>
                  <Plus size={18} />
                  Add
                </button>
              </div>
            ))}

            <button className="primary full" onClick={() => setView('checkout')}>
              Go to Checkout ({cart.length})
            </button>
          </div>

        </section>
      )}

      {view === 'checkout' && (
        <section className="grid two">

          <div className="card">
            <h2>Basket</h2>

            {cart.map((item, index) => (
              <div className="basketItem" key={index}>
                <div>
                  <strong>{item.type}</strong>
                  <p>{item.date}, {item.time}</p>
                </div>

                <strong>£{item.price}</strong>

                <button className="ghost" onClick={() => removeItem(index)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="totalBox">
              <div>
                <span>Subtotal</span>
                <strong>£{subtotal.toFixed(2)}</strong>
              </div>

              <div>
                <span>Discount</span>
                <strong>-£{discount.toFixed(2)}</strong>
              </div>

              <div className="grand">
                <span>Total</span>
                <strong>£{total.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Parent Details</h2>

            <div className="form">
              <input
                placeholder="Parent name"
                value={parent.name}
                onChange={(e) => setParent({ ...parent, name: e.target.value })}
              />

              <input
                placeholder="Email"
                value={parent.email}
                onChange={(e) => setParent({ ...parent, email: e.target.value })}
              />

              <input
                placeholder="Player name"
                value={parent.player}
                onChange={(e) => setParent({ ...parent, player: e.target.value })}
              />
            </div>

            <a
              className="primary full paypal"
              href={`https://paypal.me/marccharlestownsend/${total.toFixed(2)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay £{total.toFixed(2)} with PayPal
            </a>
          </div>

        </section>
      )}

      {view === 'parent' && (
        <section className="card">
          <h2>Parent Dashboard</h2>

          <div className="profile">
            <Users size={24} />
            <div>
              <strong>{parent.player || 'Player Name'}</strong>
              <p>{parent.name || 'Parent Name'}</p>
            </div>
          </div>
        </section>
      )}

      {view === 'admin' && (
        <section className="card">
          <h2>Admin Dashboard</h2>

          <div className="stats">
            <div>
              <p>Total Bookings</p>
              <strong>{adminStats.bookings}</strong>
            </div>

            <div>
              <p>Revenue</p>
              <strong>£{adminStats.revenue}</strong>
            </div>

            <div>
              <p>Upcoming</p>
              <strong>{adminStats.upcoming}</strong>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .app {
          min-height: 100vh;
          padding: 20px;
          background: #061017;
          color: white;
        }

        .hero {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo {
          width: 120px;
          background: white;
          border-radius: 20px;
          padding: 8px;
        }

        .eyebrow {
          color: #d8ad4f;
          font-weight: 700;
        }

        h1 {
          font-size: 52px;
          margin: 0;
        }

        .tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .tabs button,
        .primary,
        .slot button,
        .paypal {
          border: 0;
          border-radius: 16px;
          padding: 14px;
          font-weight: 700;
          background: #132532;
          color: white;
          text-decoration: none;
          text-align: center;
        }

        .tabs .active,
        .primary,
        .paypal,
        .slot button {
          background: #d8ad4f;
          color: #061017;
        }

        .grid {
          display: grid;
          gap: 20px;
        }

        .two {
          grid-template-columns: repeat(2, 1fr);
        }

        .card {
          background: #0b1822;
          border-radius: 24px;
          padding: 20px;
        }

        .sessionList,
        .form {
          display: grid;
          gap: 12px;
        }

        .session,
        .slot,
        .basketItem,
        .profile {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 16px;
          background: #132532;
        }

        .session.selected {
          outline: 2px solid #d8ad4f;
        }

        .discountBox,
        .totalBox {
          margin-top: 18px;
          background: rgba(216,173,79,.15);
          padding: 14px;
          border-radius: 16px;
        }

        .totalBox .grand {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,.15);
        }

        input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.15);
          background: #07141d;
          color: white;
        }

        .full {
          width: 100%;
          margin-top: 14px;
          display: block;
        }

        .ghost {
          background: transparent;
          border: 0;
          color: white;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .stats div {
          background: #132532;
          border-radius: 16px;
          padding: 16px;
        }

        @media (max-width: 820px) {
          .two,
          .tabs {
            grid-template-columns: 1fr;
          }

          .hero {
            flex-direction: column;
            text-align: center;
          }

          h1 {
            font-size: 38px;
          }
        }
      `}</style>

    </main>
  );
}
```
