import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Escuela Marketplace</h1>
      <p>We are dedicated to providing a diverse range of high-quality products from top categories.</p>
      <p>Our mission is to offer an extensive selection of products that meet the highest standards of quality and customer satisfaction.</p>
      
      <section className="our-values">
        <h2>Our Values</h2>
        <ul>
          <li>Quality: Curating top-tier products from trusted suppliers</li>
          <li>Diversity: Offering products across multiple categories</li>
          <li>Customer Satisfaction: Prioritizing your shopping experience</li>
          <li>Innovation: Continuously improving our marketplace</li>
        </ul>
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>Founded in 2024, Escuela Marketplace began with a simple vision: to create an online shopping platform that connects customers with exceptional products from around the world.</p>
      </section>
    </div>
  );
};

export default About;
