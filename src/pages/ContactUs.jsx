import { FaTelegram, FaFacebook, FaInstagram } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p className="subtitle">We'd love to hear from you!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <section className="contact-section">
              <h2>Get in Touch</h2>
              <p>
                Have a question or need assistance? Feel free to reach out to us through 
                any of our social media platforms. We're here to help!
              </p>
            </section>

            <section className="contact-section">
              <h2>Follow Us</h2>
              <p>Stay connected with us on social media for updates, offers, and more!</p>
              
              <div className="social-links">
                <a 
                  href="https://web.telegram.org/k/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link telegram"
                >
                  <FaTelegram className="social-icon" />
                  <span>Telegram</span>
                </a>
                
                <a 
                  href="https://www.facebook.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link facebook"
                >
                  <FaFacebook className="social-icon" />
                  <span>Facebook</span>
                </a>
                
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link instagram"
                >
                  <FaInstagram className="social-icon" />
                  <span>Instagram</span>
                </a>
              </div>
            </section>

            <section className="contact-section">
              <h2>Contact Information</h2>
              <div className="info-item">
                <strong>Email:</strong>
                <p>support@sronlineshop.com</p>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="info-item">
                <strong>Business Hours:</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

