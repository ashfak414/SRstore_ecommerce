import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="about-header">
          <h1>About SR Online-Shop</h1>
          <p className="subtitle">Your Trusted E-Commerce Partner</p>
        </div>

        <div className="about-content">
          <section className="about-section founder-section">
            <div className="founder-image">
              <img src="/founder.jpg" alt="Founder portrait" />
            </div>
            <div className="founder-info">
              <h2>Developer</h2>
              <p className="founder-name">MD.Sazzadur Rahman</p>
              <p className="founder-role">Founder &amp; Visionary</p>
              <p>
                Passionate about building a seamless shopping experience and delivering value to every customer.
                Leading SR Online-Shop with a focus on quality, trust, and continuous improvement.
              </p>
            </div>
          </section>
          <section className="about-section founder-section">
            <div className="founder-image">
              <img src="/ashfak.jpg" alt="Founder portrait" />
            </div>
            <div className="founder-info">
              <h2>Deleveloper</h2>
              <p className="founder-name">Mohammed Ashfak Chowdhury</p>
              <p className="founder-role">Founder &amp; Visionary</p>
              <p>
                Passionate about building a seamless shopping experience and delivering value to every customer.
                Leading SR Online-Shop with a focus on quality, trust, and continuous improvement.
              </p>
            </div>
          </section>
          <section className="about-section founder-section">
            <div className="founder-image">
              <img src="/image.png" alt="Founder portrait" />
            </div>
            <div className="founder-info">
              <h2>Deleveloper</h2>
              <p className="founder-name">Emam Hossain Arman</p>
              <p className="founder-role">Founder &amp; Visionary</p>
              <p>
                Passionate about building a seamless shopping experience and delivering value to every customer.
                Leading SR Online-Shop with a focus on quality, trust, and continuous improvement.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Welcome to SR Online-Shop, your one-stop destination for quality products at affordable prices. 
              We started with a simple mission: to make shopping convenient, enjoyable, and accessible to everyone.
            </p>
            <p>
              Since our inception, we have been committed to providing exceptional customer service and 
              a wide range of products that cater to your every need. From electronics to fashion, 
              home essentials to gadgets, we've got you covered.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to revolutionize online shopping by offering:
            </p>
            <ul className="mission-list">
              <li>✅ High-quality products at competitive prices</li>
              <li>✅ Fast and reliable delivery service</li>
              <li>✅ Exceptional customer support</li>
              <li>✅ Secure and easy payment options</li>
              <li>✅ A seamless shopping experience</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Quick and reliable shipping to your doorstep</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Shopping</h3>
                <p>Your data and payments are always protected</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💯</div>
                <h3>Quality Products</h3>
                <p>We ensure only the best products reach you</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Best Prices</h3>
                <p>Competitive pricing with regular discounts</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <p>
              At SR Online-Shop, we believe in integrity, customer satisfaction, and continuous improvement. 
              We are constantly evolving to serve you better and make your shopping experience memorable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


