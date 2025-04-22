// src/components/Contacts.tsx
import React from 'react';

const Contacts: React.FC = () => {
  return (
    <div className="contacts-page">
      <h1>Contact Escuela Marketplace</h1>
      <p>This is the Contact page. You can reach us at contact@escuelamarketplace.com.</p>
      <div className="contact-info">
        <p>Customer Support: +1 (800) ESCUELA</p>
        <p>Email: support@escuelamarketplace.com</p>
        <p>Address: 123 Marketplace Street, Silicon Valley, CA 94000</p>
      </div>
    </div>
  );
};

export default Contacts;
