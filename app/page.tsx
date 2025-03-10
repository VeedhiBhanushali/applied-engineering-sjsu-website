'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useSpring } from 'react-spring';
import Link from 'next/link';

export default function Home() {
  // State for cursor
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // State for timeline
  const [activeMonth, setActiveMonth] = useState(0);
  const months = ['January', 'February', 'March', 'April', 'May'];
  
  // State for FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Timeline data by month
  const timelineEventsByMonth = [
    // January
    [
      { date: 'Jan 21', title: 'Application Opens', time: '12:00 AM' },
      { date: 'Jan 25', title: 'Info Session One', time: '6-8 PM' },
      { date: 'Jan 28', title: 'Info Session Two', time: '8-10 PM' },
      { date: 'Jan 30', title: 'Technical Workshop', time: '8-10 PM' },
      { date: 'Jan 31', title: 'Application Closes', time: '11:59 PM' },
    ],
    // February
    [
      { date: 'Feb 2', title: 'Technical Deliverables Due', time: '11:59 PM' },
      { date: 'Feb 5-10', title: 'Interview Week', time: 'Various Times' },
      { date: 'Feb 15', title: 'Final Decisions', time: '5:00 PM' },
      { date: 'Feb 20', title: 'Onboarding Session', time: '6:00 PM' },
      { date: 'Feb 28', title: 'Team Formation', time: '4:00 PM' },
    ],
    // March
    [
      { date: 'Mar 1', title: 'Project Kickoff', time: '4:00 PM' },
      { date: 'Mar 10', title: 'First Progress Check', time: '5:00 PM' },
      { date: 'Mar 15', title: 'Mid-Semester Review', time: '3:00 PM' },
      { date: 'Mar 25', title: 'Technical Workshop', time: '7:00 PM' },
      { date: 'Mar 30', title: 'Progress Presentations', time: '5:00 PM' },
    ],
    // April
    [
      { date: 'Apr 5', title: 'Industry Mentor Day', time: '2:00 PM' },
      { date: 'Apr 10', title: 'Final Project Sprint', time: 'All Day' },
      { date: 'Apr 20', title: 'Project Testing', time: '3:00 PM' },
      { date: 'Apr 25', title: 'Project Showcase', time: '1:00 PM - 5:00 PM' },
      { date: 'Apr 30', title: 'End of Semester Celebration', time: '7:00 PM' },
    ],
    // May
    [
      { date: 'May 5', title: 'Project Documentation Due', time: '11:59 PM' },
      { date: 'May 10', title: 'Summer Project Planning', time: '4:00 PM' },
      { date: 'May 15', title: 'Leadership Transition', time: '5:00 PM' },
      { date: 'May 20', title: 'Summer Kickoff', time: '6:00 PM' },
    ],
  ];
  
  // FAQ data
  const faqData = [
    {
      question: 'What services does Applied Engineering offer ?',
      answer: 'Applied Engineering offers a range of engineering consulting services including mechanical design, electrical systems development, software solutions, and interdisciplinary project management for both academic and industry partners.'
    },
    {
      question: 'How does Applied Engineering work with clients ?',
      answer: 'We follow a collaborative approach, starting with an initial consultation to understand your needs, followed by project scoping, regular progress updates, and final delivery. Our team maintains open communication throughout the entire process.'
    },
    {
      question: 'How long does it take to complete a project ?',
      answer: 'Project timelines vary based on complexity and scope. Small projects may take 2-4 weeks, while larger initiatives can span an entire semester. We provide detailed timeline estimates during the initial consultation phase.'
    },
    {
      question: 'How can I join Applied Engineering ?',
      answer: 'We recruit new members at the beginning of each semester. The process includes an online application, technical assessment, and interview. Follow our recruitment timeline for specific dates and attend our info sessions to learn more.'
    }
  ];

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

  // Smooth scroll function
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className={styles.main}>
      {/* Custom cursor */}
      <div id="cursor" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}></div>
      <div id="cursor-blur" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}></div>
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <Image src="/images/ae-logo.png" alt="Applied Engineering Logo" width={30} height={30} />
          <span>Applied Engineering</span>
        </div>
        <nav className={styles.nav}>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#teams" onClick={(e) => { e.preventDefault(); scrollToSection('teams'); }}>Teams</a>
          <a href="#family" onClick={(e) => { e.preventDefault(); scrollToSection('family'); }}>Family</a>
          <a href="#timeline" onClick={(e) => { e.preventDefault(); scrollToSection('timeline'); }}>Timeline</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
          <Link href="/contact" className={styles.contactBtn}>
            Contact Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.title}>Engineering the Future — One Project at a Time.</h1>
            <div className={styles.heroLine}></div>
            <p className={styles.subtitle}>
              Applied Engineering at SJSU brings together talented students from mechanical, electrical, and software engineering to solve real-world problems through innovative solutions and interdisciplinary collaboration.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btn} onClick={() => scrollToSection('about')}>
                Learn More
                <span className={styles.btnArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
                  </svg>
                </span>
              </button>
              <Link href="/contact" className={styles.btnOutline}>
                Join Us
                <span className={styles.btnArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            {/* Removed engineering illustration as requested */}
          </div>
        </div>
        <div className={styles.scrollIndicator} onClick={() => scrollToSection('about')}>
          <span>Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about} ref={aboutRef}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutLeft}>
            <div className={styles.aboutText}>
              Applied Engineering is a student-led organization at San Jose State University dedicated to fostering interdisciplinary collaboration among engineering students. We provide hands-on experience through real-world projects, workshops, and industry partnerships.
            </div>
            <div className={styles.aboutText}>
              <p className={styles.descriptionText}>
                Our mission is to bridge the gap between academic learning and professional practice, creating a community where students can develop technical skills, leadership abilities, and innovative thinking.
              </p>
            </div>
            <div className={styles.aboutCTA}>
              <Link href="/contact" className={styles.btn}>
                Partner With Us
                <span className={styles.btnArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.aboutRight}>
            <div className={styles.statCard}>
              <h3>For Students</h3>
              <p className={styles.descriptionText}>Gain hands-on experience with real-world engineering projects, develop technical and soft skills, and build a professional network with industry connections.</p>
            </div>
            <div className={styles.statCard}>
              <h3>For Faculty</h3>
              <p className={styles.descriptionText}>Collaborate with motivated students on research initiatives, access interdisciplinary engineering talent, and bridge the gap between academic theory and practical application.</p>
            </div>
            <div className={styles.statCard}>
              <h3>For Industry</h3>
              <p className={styles.descriptionText}>Partner with talented engineering students to solve technical challenges, prototype innovative solutions, and identify potential future employees for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section - Moved before Family section as requested */}
      <section id="teams" className={styles.teams} ref={teamsRef}>
        <div className={styles.sectionHeader}>
          <h2>&nbsp;Our Teams &nbsp;&nbsp; &nbsp;&nbsp;</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.teamsGrid}>
          <Link href="/teams/mechanical" className={styles.teamCard}>
            <div className={styles.teamIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z" stroke="white" strokeWidth="1.5"/>
                <path d="M19.5 8C19.5 8.55228 19.0523 9 18.5 9C17.9477 9 17.5 8.55228 17.5 8C17.5 7.44772 17.9477 7 18.5 7C19.0523 7 19.5 7.44772 19.5 8Z" stroke="white" strokeWidth="1.5"/>
                <path d="M6.5 8C6.5 8.55228 6.05228 9 5.5 9C4.94772 9 4.5 8.55228 4.5 8C4.5 7.44772 4.94772 7 5.5 7C6.05228 7 6.5 7.44772 6.5 8Z" stroke="white" strokeWidth="1.5"/>
                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="white" strokeWidth="1.5"/>
                <path d="M16.5 16H16.51" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7.5 16H7.51" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>&nbsp;Mechanical Engineering</h3>
            <p className={styles.descriptionText}>
              Our mechanical engineering team specializes in designing and prototyping physical systems, from robotics and automation to structural analysis and manufacturing processes.
            </p>
          </Link>
          <Link href="/teams/electrical" className={styles.teamCard}>
            <div className={styles.teamIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15.2421C4.44752 13.6273 4.44752 11.3727 5 9.75771M7.5 11.2421C7.16473 10.4273 7.16473 9.57271 7.5 8.75771" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 15.2421C19.5525 13.6273 19.5525 11.3727 19 9.75771M16.5 11.2421C16.8353 10.4273 16.8353 9.57271 16.5 8.75771" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3>&nbsp;Electrical Engineering</h3>
            <p className={styles.descriptionText}>
              The electrical engineering team focuses on circuit design, embedded systems, power electronics, and signal processing for a wide range of applications and industries.
            </p>
          </Link>
          <Link href="/teams/software" className={styles.teamCard}>
            <div className={styles.teamIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13.9868 5L10.0132 19.8297" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>&nbsp;Software Engineering</h3>
            <p className={styles.descriptionText}>
              Our software team develops applications, algorithms, and interfaces that power our projects, from web and mobile apps to machine learning models and control systems.
            </p>
          </Link>
        </div>
      </section>

      {/* Family Section - Moved after Teams section as requested */}
      <section id="family" className={styles.family} ref={familyRef}>
        <div className={styles.familyGrid}>
          <div className={styles.familyImage}>
            <Image 
              src="/images/team1.svg" 
              alt="Applied Engineering Team" 
              width={280} 
              height={220} 
            />
          </div>
          <div className={styles.familyImage}>
            <Image 
              src="/images/team2.svg" 
              alt="Applied Engineering Team" 
              width={320} 
              height={240} 
            />
          </div>
          <div className={styles.familyImage}>
            <Image 
              src="/images/team3.svg" 
              alt="Applied Engineering Team" 
              width={260} 
              height={200} 
            />
          </div>
          <div className={styles.familyImage}>
            <Image 
              src="/images/team1.svg" 
              alt="Applied Engineering Team" 
              width={300} 
              height={230} 
            />
          </div>
          <div className={styles.familyImage}>
            <Image 
              src="/images/team2.svg" 
              alt="Applied Engineering Team" 
              width={340} 
              height={250} 
            />
          </div>
          <div className={styles.familyImage}>
            <Image 
              src="/images/team3.svg" 
              alt="Applied Engineering Team" 
              width={290} 
              height={220} 
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className={styles.timeline} ref={timelineRef}>
        <div className={styles.timelineHeader}>
          <h2>Spring 2025 Recruitment Timeline</h2>
          <div className={styles.line}></div>
          <p style={{ maxWidth: '800px', margin: '0', color: 'var(--black)' }}>
            Ready to join our family and work on exciting projects? Applications for Spring 2025 open soon for all majors!
          </p>
        </div>
        <div className={styles.timelineContainer}>
          {/* Month tabs */}
          <div className={styles.timelineTabs}>
            {months.map((month, index) => (
              <div 
                key={month} 
                className={`${styles.timelineTab} ${activeMonth === index ? styles.active : ''}`}
                onClick={() => setActiveMonth(index)}
              >
                {month}
              </div>
            ))}
          </div>
          
          {/* Display timeline events based on active month */}
          {activeMonth === 0 && (
            <div className={styles.timelineBar}>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Jan 21</div>
                <div className={styles.eventTitle}>Application Opens</div>
                <div className={styles.eventTime}>12:00 AM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Jan 25</div>
                <div className={styles.eventTitle}>Info Session One</div>
                <div className={styles.eventTime}>6-8 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Jan 28</div>
                <div className={styles.eventTitle}>Info Session Two</div>
                <div className={styles.eventTime}>8-10 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Jan 30</div>
                <div className={styles.eventTitle}>Technical Workshop</div>
                <div className={styles.eventTime}>8-10 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Jan 31</div>
                <div className={styles.eventTitle}>Application Closes</div>
                <div className={styles.eventTime}>12:00 PM</div>
              </div>
            </div>
          )}
          
          {activeMonth === 1 && (
            <div className={styles.timelineBar}>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Feb 2</div>
                <div className={styles.eventTitle}>Technical Deliverables Due</div>
                <div className={styles.eventTime}>11:59 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Feb 3-4</div>
                <div className={styles.eventTitle}>Technical Interviews</div>
                <div className={styles.eventTime}>Various Times</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Feb 7</div>
                <div className={styles.eventTitle}>Acceptances Sent</div>
                <div className={styles.eventTime}>5:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Feb 15</div>
                <div className={styles.eventTitle}>Onboarding</div>
                <div className={styles.eventTime}>4:00 PM</div>
              </div>
            </div>
          )}
          
          {activeMonth === 2 && (
            <div className={styles.timelineBar}>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Mar 1</div>
                <div className={styles.eventTitle}>Project Kickoff</div>
                <div className={styles.eventTime}>4:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Mar 10</div>
                <div className={styles.eventTitle}>First Progress Check</div>
                <div className={styles.eventTime}>5:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Mar 15</div>
                <div className={styles.eventTitle}>Mid-Semester Review</div>
                <div className={styles.eventTime}>3:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Mar 25</div>
                <div className={styles.eventTitle}>Workshop</div>
                <div className={styles.eventTime}>7:00 PM</div>
              </div>
            </div>
          )}
          
          {activeMonth === 3 && (
            <div className={styles.timelineBar}>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Apr 5</div>
                <div className={styles.eventTitle}>Mentor Day</div>
                <div className={styles.eventTime}>2:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Apr 10</div>
                <div className={styles.eventTitle}>Project Sprint</div>
                <div className={styles.eventTime}>All Day</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Apr 15</div>
                <div className={styles.eventTitle}>Final Presentations</div>
                <div className={styles.eventTime}>5:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>Apr 25</div>
                <div className={styles.eventTitle}>End of Semester</div>
                <div className={styles.eventTime}>3:00 PM</div>
              </div>
            </div>
          )}
          
          {activeMonth === 4 && (
            <div className={styles.timelineBar}>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>May 5</div>
                <div className={styles.eventTitle}>Project Showcase</div>
                <div className={styles.eventTime}>1:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>May 10</div>
                <div className={styles.eventTitle}>Industry Demo Day</div>
                <div className={styles.eventTime}>4:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>May 15</div>
                <div className={styles.eventTitle}>Team Celebration</div>
                <div className={styles.eventTime}>6:00 PM</div>
              </div>
              <div className={styles.timelineEvent}>
                <div className={styles.eventDate}>May 20</div>
                <div className={styles.eventTitle}>Summer Planning</div>
                <div className={styles.eventTime}>2:00 PM</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faq} ref={faqRef}>
        <div className={styles.faqHeader}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.faqContainer}>
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeFaq === index ? styles.active : ''}`}
            >
              <div 
                className={styles.faqQuestion}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                {item.question}
              </div>
              <div className={styles.faqAnswer}>
                <p className={styles.descriptionText}>{item.answer}</p>
              </div>
            </div>
          ))}
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
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a>
              <a href="#family" onClick={(e) => { e.preventDefault(); scrollToSection('family'); }}>Our Family</a>
              <a href="#teams" onClick={(e) => { e.preventDefault(); scrollToSection('teams'); }}>Teams</a>
              <a href="#timeline" onClick={(e) => { e.preventDefault(); scrollToSection('timeline'); }}>Timeline</a>
            </div>
            <div className={styles.footerLinkGroup}>
              <h4>Resources</h4>
              <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
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
