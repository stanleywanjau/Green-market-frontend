import React from 'react';

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Our Green Market Website</h1>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Green Market, our mission is simple: to support local farmers while providing customers with the freshest and highest quality produce available. We believe in the importance of knowing where your food comes from and the positive impact of supporting small-scale agriculture. By bridging the gap between farmers and consumers, we aim to promote environmental sustainability, community resilience, and healthy living.
        </p>
      </section>
      <section className="why-choose-section">
        <h2>Why Choose Green Market?</h2>
        <ul>
          <li className="why-choose-section" >
            <strong>Freshness Guaranteed:</strong> Every product listed on our website comes directly from local farmers, ensuring that you receive the freshest produce possible. Say goodbye to long supply chains and hello to farm-to-table goodness.
          </li>
          <li className="why-choose-section">
            <strong>Support Local Farmers:</strong> When you shop with us, you're not just getting great produce—you're also supporting hardworking farmers in your community. By cutting out middlemen and connecting directly with farmers, you can feel good knowing that your purchase has a positive impact.
          </li>
          <li className="why-choose-section">
            <strong>Variety and Quality:</strong> From crisp, organic vegetables to succulent fruits bursting with flavor, we offer a wide variety of products to suit every taste and dietary preference. Each item is carefully selected for its quality and freshness, so you can shop with confidence.
          </li>
          <li className="why-choose-section">
            <strong>Transparency:</strong> We believe in transparency every step of the way. With detailed product descriptions and farmer profiles, you'll know exactly where your food comes from and how it was grown. Have a question? Our friendly customer support team is here to help.
          </li>
        </ul>
      </section>
      <section className="community-section">
        <h2>Join Our Community</h2>
        <p>
          Whether you're a farmer looking to sell your products or a customer eager to support local agriculture, we invite you to join our growing community at Green Market. Together, we can build a more sustainable and resilient food system, one delicious bite at a time.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;