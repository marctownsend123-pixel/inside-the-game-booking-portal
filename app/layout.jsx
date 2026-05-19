import './globals.css';

export const metadata = {
  title: 'Inside the Game Booking Portal',
  description: 'Football coaching booking portal for parents and players.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
