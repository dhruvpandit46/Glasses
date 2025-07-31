import React, { useState } from 'react';
import QRCodePopup from './components/QRCodePopup';

function App() {
  const [showQR, setShowQR] = useState(false);
  const product = {
    name: 'Cool Product',
    description: 'This is a sample product',
    image: 'product.jpg' // make sure this is a valid path
  };

  return (
    <div>
      <h1>My Product</h1>
      <button onClick={() => setShowQR(true)}>Show QR Code</button>
      <QRCodePopup show={showQR} onClose={() => setShowQR(false)} product={product} />
    </div>
  );
}

export default App;
