'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Contact() {
  // State for cursor
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateCursorPosition = () => {
      const easing = 0.05; // Lower value = more lag (changed from 0.1)
      
      // Calculate the distance between current position and target
      const dx = targetX - cursorX;
      const dy = targetY - cursorY;
      
      // Move current position a percentage of the distance
      cursorX += dx * easing;
      cursorY += dy * easing;
      
      // Apply the position
      if (cursor && cursorBlur) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorBlur.style.left = `${cursorX}px`;
        cursorBlur.style.top = `${cursorY}px`;
      }
      
      // Continue animation
      requestAnimationFrame(updateCursorPosition);
    };

    const expandCursor = () => {
      setIsExpanded(true);
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      }
    };

    const shrinkCursor = () => {
      setIsExpanded(false);
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);

    // Add hover effect to all links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', expandCursor);
      el.addEventListener('mouseleave', shrinkCursor);
    });
    
    // Start the animation loop
    updateCursorPosition();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', expandCursor);
        el.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/#about">ABOUT</Link>
          <Link href="/#family">FAMILY</Link>
          <Link href="/#teams">TEAMS</Link>
          <Link href="/#timeline">TIMELINE</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/contact" className={styles.contactBtn}>
            CONTACT
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
          </Link>
        </nav>
      </header>

      {/* Contact Section */}
      <section className={styles.contact}>
        <div className={styles.contactHeaderr}>
          <h2>GET IN TOUCH</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.contactContent}>
          <div className={styles.contactLeft}>
            <p className={styles.contactText}>
              Interested in partnering with Applied Engineering or joining our team? We'd love to hear from you! Fill out the form or reach out to us directly using the contact information below.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>appliedengineeringsjsu@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>San Jose State University, San Jose, CA</span>
              </div>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/appliedengineering.sjsu?igsh=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://linktr.ee/ae.sjsu" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.092 2.585a1 1 0 011.816 0L12 6.414l2.092-3.829a1 1 0 011.816 0L19.5 8.5h-15l3.592-5.915zM21 10v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10h18zm-9 2h-2v6h2v-6zm4 0h-2v6h2v-6z"/>
                </svg>
              </a>
              <a href="mailto:appliedengineeringsjsu@gmail.com" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.contactRight}>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Your Name" />
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Your Email" />
              </div>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Subject" />
              </div>
              <div className={styles.formGroup}>
                <textarea rows={4} placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className={styles.btn}>
                Send Message
                <span className={styles.btnArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer 
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <h3>Applied Engineering</h3>
            <p>Engineering the Future — One Project at a Time</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h4>Navigation</h4>
              <Link href="/#about">About Us</Link>
              <Link href="/#family">Our Family</Link>
              <Link href="/#teams">Teams</Link>
              <Link href="/#timeline">Timeline</Link>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4>Resources</h4>
              <Link href="/#faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Applied Engineering SJSU. All rights reserved.</p>
        </div>
      </footer>
      */}
    </main>
  );
} 