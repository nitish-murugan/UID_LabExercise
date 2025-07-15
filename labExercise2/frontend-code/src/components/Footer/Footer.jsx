import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          © 2024 OneCredit. All rights reserved.
        </p>
        <div className={styles.footerLinks}>
          <span className={styles.link}>Privacy Policy</span>
          <span className={styles.link}>Terms of Service</span>
          <span className={styles.link}>Contact Us</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
