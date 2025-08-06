import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>NSP Bazaar</h3>
          <p>
            Your trusted marketplace for electronics, books, properties,
            vehicles, and fashion.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/categories">Categories</a>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@nspbazar.in</p>
          <p>Phone: +91-1234567890</p>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        © 2025 NSP Bazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
