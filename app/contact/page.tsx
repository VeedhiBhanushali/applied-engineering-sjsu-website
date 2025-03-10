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
        <div className={styles.headerLogo}>
          <Link href="/">
            <Image 
              src="/images/ae-logo.svg" 
              alt="Applied Engineering Logo" 
              width={30} 
              height={30} 
            />
            <span>Applied Engineering</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/#about">About Us</Link>
          <Link href="/#family">Our Family</Link>
          <Link href="/#teams">Teams</Link>
          <Link href="/#timeline">Timeline</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/contact" className={styles.contactBtn}>
            Contact Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
          </Link>
        </nav>
      </header>

      {/* Contact Section */}
      <section className={styles.contact}>
        <div className={styles.sectionHeader}>
          <h2>&nbsp;&nbsp;Get In Touch</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.contactContent}>
          <div className={styles.contactLeft}>
            <p className={styles.contactText}>
              Interested in partnering with Applied Engineering or joining our team? We'd love to hear from you! Fill out the form or reach out to us directly using the contact information below.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>appliedengineering@sjsu.edu</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>San Jose State University, San Jose, CA</span>
              </div>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
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
                <textarea rows={5} placeholder="Your Message"></textarea>
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

      {/* Footer */}
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
    </main>
  );
} 