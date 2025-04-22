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

  // Add this near the top of the file, with other state declarations
  const [currentMonth, setCurrentMonth] = useState('JANUARY');
  const [expandedMonth, setExpandedMonth] = useState('JANUARY');
  const [currentMonthDays, setCurrentMonthDays] = useState<number[]>([]);
  const [firstDayOffset, setFirstDayOffset] = useState(0);

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

  useEffect(() => {
    // Function to get days in month
    const getDaysInMonth = (month: string) => {
      const daysMap: { [key: string]: number } = {
        'JANUARY': 31,
        'FEBRUARY': 28,
        'MARCH': 31,
        'APRIL': 30,
        'MAY': 31
      };
      return daysMap[month] || 31;
    };

    // Function to get first day offset (0 = Sunday, 1 = Monday, etc.)
    const getFirstDayOffset = (month: string) => {
      const offsetMap: { [key: string]: number } = {
        'JANUARY': 0, // Sunday
        'FEBRUARY': 3, // Wednesday
        'MARCH': 3, // Wednesday
        'APRIL': 6, // Saturday
        'MAY': 1 // Monday
      };
      return offsetMap[month] || 0;
    };

    const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1);
    setCurrentMonthDays(days);
    setFirstDayOffset(getFirstDayOffset(currentMonth));
  }, [currentMonth]);

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
       
        <nav className={styles.nav}>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>ABOUT</a>
          <a href="#teams" onClick={(e) => { e.preventDefault(); scrollToSection('teams'); }}>TEAMS</a>
          <a href="#family" onClick={(e) => { e.preventDefault(); scrollToSection('family'); }}>FAMILY</a>
          <a href="#timeline" onClick={(e) => { e.preventDefault(); scrollToSection('timeline'); }}>TIMELINE</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
          <Link href="/contact" className={styles.contactBtn}>
            CONTACT US
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Image 
            src="/logo.png"
            alt="Applied Engineering Logo"
            width={80}
            height={80}
            className={styles.heroLogo}
          />
          <h2 className={styles.heroTitle}>APPLIED <br /> ENGINEERING</h2>
          <div className={styles.heroBottom}>
            <p className={styles.universityText}>SAN JOSE STATE UNIVERSITY</p>
            <button className={styles.joinButton}>JOIN NOW</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about} ref={aboutRef}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutLeft}>
            <h1 className={styles.aboutTitle}>
              SJSU'S FIRST STUDENT-LED ENGINEERING<br />
              CONSULTING CLUB,<br />
              DESIGNED TO GIVE STUDENTS<br />
              THE HANDS-ON EXPERIENCE THEY NEED<br />
              — BUT RARELY GET.
            </h1>
            <div className={styles.aboutLinks}>
              <p>BUILD YOUR PORTFOLIO <br />WORK WITH INDUSTRY <br />GET HIRED</p>
            </div>
          </div>
          <div className={styles.aboutRight}>
            <button className={styles.aboutButton}>FOR INDUSTRY</button>
            <button className={styles.aboutButton}>FOR STUDENTS</button>
            <button className={styles.learnMore}>LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" className={styles.teams} ref={teamsRef}>
        <div className={styles.teamsHeader}>
          <h2>TEAMS</h2>
          <div className={styles.teamsSubheader}>
            <p>WORK IN CROSS-DISCIPLINARY TEAMS</p>
            <p>WORKING IN UNISON</p>
          </div>
        </div>
        <div className={styles.teamsGrid}>
          <div className={styles.teamCard}>
            <div className={styles.teamNumber}>01</div>
            <div className={styles.teamContent}>
              <h3>MECHANICAL</h3>
              <h4>DESIGN THE FOUNDATION OF INNOVATION.
              <p>OUR MECHANICAL TEAM ENGINEERS THE PHYSICAL WORLD — FROM INTRICATE CAD MODELS AND ROBUST MECHANISMS TO FULLY FUNCTIONAL PROTOTYPES.</p></h4>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div className={styles.teamNumber}>02</div>
            <div className={styles.teamContent}>
              <h3>ELECTRICAL</h3>
              <h4>BRING INTELLIGENCE TO HARDWARE.
              <p>WE HANDLE EVERYTHING FROM CIRCUIT DESIGN AND PCB LAYOUT TO SENSORS, MICROCONTROLLERS, AND EMBEDDED SYSTEMS. WE CREATE THE INTERFACE BETWEEN MECHANICAL FORM AND DIGITAL CONTROL.</p></h4>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div className={styles.teamNumber}>03</div>
            <div className={styles.teamContent}>
              <h3>SOFTWARE</h3>
              <h4>BRAINS BEHIND EVERY BUILD.<p>OUR SOFTWARE TEAM BRIDGES HARDWARE AND INTELLIGENCE — CODING THE SYSTEMS THAT ENABLE AUTOMATION, DECISION-MAKING, AND CONTROL.</p></h4>
            </div>
          </div>
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
      <section className={styles.timeline}>
        <div className={styles.timelineContainer}>
          <h2 className={styles.timelineTitle}>FALL 2025</h2>
          
          <div className={styles.timelineContent}>
            {/* Left side - Calendar */}
            <div className={styles.calendar}>
              <div className={styles.calendarHeader}>
                <h3>{currentMonth}</h3>
                <h3>EVENTS</h3>
              </div>
              
              <div className={styles.calendarGrid}>
                <div className={styles.calendarDays}>
                  <span>SUN</span>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                </div>
                
                <div className={styles.calendarDates}>
                  {/* Empty cells for offset */}
                  {Array.from({ length: firstDayOffset }, (_, i) => (
                    <div key={`empty-${i}`} className={styles.calendarCell}></div>
                  ))}
                  
                  {/* Actual date cells */}
                  {currentMonthDays.map((day) => (
                    <div 
                      key={`day-${day}`} 
                      className={`${styles.calendarCell} ${
                        currentMonth === 'JANUARY' && day === 21 ? styles.eventCell : ''
                      }`}
                    >
                      {day}
                      {currentMonth === 'JANUARY' && day === 21 && (
                        <div className={styles.eventIndicator}>Event One</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Timeline */}
            <div className={styles.recruitmentTimeline}>
              <div className={styles.timelineEvents}>
                <h2 className={styles.timelineHeader}>RECRUITMENT TIMELINE</h2>
                
                {/* January */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('JANUARY');
                    setExpandedMonth('JANUARY');
                  }}
                >
                  <span className={styles.eventMonth}>JANUARY</span>
                  {expandedMonth === 'JANUARY' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>EVENT ONE</span>
                          <span className={styles.eventDate}>01/21</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>EVENT TWO</span>
                          <span className={styles.eventDate}>01/25</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>EVENT THREE</span>
                          <span className={styles.eventDate}>01/26</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* February */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('FEBRUARY');
                    setExpandedMonth('FEBRUARY');
                  }}
                >
                  <span className={styles.eventMonth}>FEBRUARY</span>
                  {expandedMonth === 'FEBRUARY' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>FEBRUARY →</span>
                          <span className={styles.eventDate}>02/01</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* March */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('MARCH');
                    setExpandedMonth('MARCH');
                  }}
                >
                  <span className={styles.eventMonth}>MARCH</span>
                  {expandedMonth === 'MARCH' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>MARCH →</span>
                          <span className={styles.eventDate}>03/01</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* April */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('APRIL');
                    setExpandedMonth('APRIL');
                  }}
                >
                  <span className={styles.eventMonth}>APRIL</span>
                  {expandedMonth === 'APRIL' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>APRIL →</span>
                          <span className={styles.eventDate}>04/01</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* May */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('MAY');
                    setExpandedMonth('MAY');
                  }}
                >
                  <span className={styles.eventMonth}>MAY</span>
                  {expandedMonth === 'MAY' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>MAY →</span>
                          <span className={styles.eventDate}>05/01</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faq} ref={faqRef}>
        <div className={styles.faqHeader}>
          <h2>FREQUENTLY <br /> ASKED <span className={styles.dash}>———</span> <br /> <span>QUESTIONS</span></h2>
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
        <div className={styles.faqBottomText}>
          <div className={styles.appliedText}>APPLIED</div>
          <div className={styles.engineeringText}>ENGINEERING</div>
          <div className={styles.faqSocialIcons}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://linktr.ee/appliedengineering" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.092 2.585a1 1 0 011.816 0L12 6.414l2.092-3.829a1 1 0 011.816 0L19.5 8.5h-15l3.592-5.915zM21 10v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10h18zm-9 2h-2v6h2v-6zm4 0h-2v6h2v-6z"/>
              </svg>
            </a>
            <a href="mailto:contact@appliedengineering.com" className={styles.socialIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

     
    </main>
  );
}
