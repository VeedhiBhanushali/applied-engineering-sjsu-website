'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useSpring } from 'react-spring';
import Link from 'next/link';

export default function Home() {
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
  // Month labels used by the recruitment timeline
  const months = ['SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  
  // State for FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // State for expanded team card
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  
  // State for industry modal
  const [showIndustryModal, setShowIndustryModal] = useState(false);
  
  // State for students modal
  const [showStudentsModal, setShowStudentsModal] = useState(false);

  // Handle escape key to close overlays
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedTeam(null);
        setShowIndustryModal(false);
        setShowStudentsModal(false);
      }
    };

    if (expandedTeam || showIndustryModal || showStudentsModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [expandedTeam, showIndustryModal, showStudentsModal]);

  // Team detailed content
  const teamDetails = [
    {
      id: 1,
      title: "TECHNICAL",
      subtitle: "TURNING CODE INTO IMPACT",
      description: "WE LEAD SOFTWARE PROJECTS, TECHNICAL WORKSHOPS, AND SKILL-BUILDING INITIATIVES — DELIVERING REAL SOLUTIONS FOR CLIENTS WHILE EQUIPPING MEMBERS WITH INDUSTRY-READY EXPERIENCE.",
      detailedContent: {
        skills: ["Full-Stack Development", "Mobile App Development", "API Design", "Database Architecture", "Cloud Infrastructure"],
        projects: ["Client Web Applications", "Technical Workshops", "Skill-Building Programs", "Software Solutions"],
        tools: ["React", "Node.js", "Python", "AWS", "Docker", "Git"]
      }
    },
    {
      id: 2,
      title: "MANAGEMENT",
      subtitle: "DRIVING STRATEGY AND PARTNERSHIPS",
      description: "WE OVERSEE OPERATIONS, CLIENT OUTREACH, FINANCES, AND LOGISTICS — ENSURING AE RUNS LIKE A CONSULTING FIRM AND EVERY PROJECT TEAM HAS THE SUPPORT TO SUCCEED.",
      detailedContent: {
        skills: ["Project Management", "Client Relations", "Financial Planning", "Strategic Planning", "Operations Management"],
        projects: ["Client Partnerships", "Operational Systems", "Budget Management", "Team Coordination"],
        tools: ["Notion", "Slack", "Google Workspace", "Figma", "Trello", "QuickBooks"]
      }
    },
    {
      id: 3,
      title: "CREATIVES",
      subtitle: "DESIGNING THE STORY AND EXPERIENCE",
      description: "WE SHAPE AE'S BRAND THROUGH MARKETING, EVENTS, AND MEDIA — MAKING OUR WORK VISIBLE, ENGAGING, AND INSPIRING TO STUDENTS, CLIENTS, AND THE COMMUNITY.",
      detailedContent: {
        skills: ["Brand Design", "Digital Marketing", "Event Planning", "Content Creation", "Social Media Strategy"],
        projects: ["Brand Identity", "Marketing Campaigns", "Event Production", "Content Strategy"],
        tools: ["Adobe Creative Suite", "Figma", "Canva", "Instagram", "LinkedIn", "Webflow"]
      }
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: 'What services does Applied Engineering offer ?',
      answer: 'Applied Engineering provides student-led software consulting services, delivering high-quality solutions such as web and mobile applications, automation tools, and data-driven systems. Our teams work with clients each semester to design, develop, and deploy cost-effective software while giving students real-world project experience.'
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
  const [currentMonth, setCurrentMonth] = useState('SEPTEMBER');
  const [expandedMonth, setExpandedMonth] = useState('SEPTEMBER');
  const [currentMonthDays, setCurrentMonthDays] = useState<number[]>([]);
  const [firstDayOffset, setFirstDayOffset] = useState(0);

  useEffect(() => {
    // Function to get days in month
    const getDaysInMonth = (month: string) => {
      const daysMap: { [key: string]: number } = {
        'SEPTEMBER': 30,
        'OCTOBER': 31,
        'NOVEMBER': 30,
        'DECEMBER': 31
      };
      return daysMap[month] || 31;
    };

    // Function to get first day offset (0 = Sunday, 1 = Monday, etc.)
    const getFirstDayOffset = (month: string) => {
      const offsetMap: { [key: string]: number } = {
        'SEPTEMBER': 1, // Monday
        'OCTOBER': 3, // Wednesday
        'NOVEMBER': 6, // Saturday
        'DECEMBER': 1 // Monday
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
      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink}>
          <Image src="/ae-logo.png" alt="AE Logo" width={40} height={24} className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>ABOUT</a>
          <a href="#teams" onClick={(e) => { e.preventDefault(); scrollToSection('teams'); }}>TEAMS</a>
          <a href="#family" onClick={(e) => { e.preventDefault(); scrollToSection('family'); }}>FAMILY</a>
          <a href="#timeline" onClick={(e) => { e.preventDefault(); scrollToSection('timeline'); }}>TIMELINE</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}>FAQ</a>
          <Link href="/contact" className={styles.contactBtn}>
            CONTACT
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
            src="/ae-logo.png"
            alt="Applied Engineering Logo"
            width={120}
            height={72}
            className={styles.heroLogo}
          />
          <h2 className={styles.heroTitle}>APPLIED <br /> ENGINEERING</h2>
          <div className={styles.heroBottom}>
            <p className={styles.universityText}>SAN JOSE STATE UNIVERSITY</p>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdHEp7dKModGmD9Bj4HVrLc7t_8OrXw6qwkvo3P8eFIjuYkyQ/viewform" className={styles.joinButton} target="_blank">JOIN NOW</Link>
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
            <button className={styles.aboutButton} onClick={() => setShowIndustryModal(true)}>FOR INDUSTRY</button>
            <button className={styles.aboutButton} onClick={() => setShowStudentsModal(true)}>FOR STUDENTS</button>
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
          <motion.div 
            className={styles.teamCard}
            whileHover={{ 
              y: -12, 
              scale: 1.03,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setExpandedTeam(1)}
          >
            <motion.div 
              className={styles.teamNumber}
              whileHover={{ 
                scale: 1.08,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              01
            </motion.div>
            <div className={styles.teamContent}>
              <motion.h3
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                TECHNICAL
              </motion.h3>
              <h4>TURNING CODE INTO IMPACT.
              <motion.p
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                WE LEAD SOFTWARE PROJECTS, TECHNICAL WORKSHOPS, AND SKILL-BUILDING INITIATIVES — DELIVERING REAL SOLUTIONS FOR CLIENTS WHILE EQUIPPING MEMBERS WITH INDUSTRY-READY EXPERIENCE.
              </motion.p></h4>
            </div>
          </motion.div>
          <motion.div 
            className={styles.teamCard}
            whileHover={{ 
              y: -12, 
              scale: 1.03,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setExpandedTeam(2)}
          >
            <motion.div 
              className={styles.teamNumber}
              whileHover={{ 
                scale: 1.08,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              02
            </motion.div>
            <div className={styles.teamContent}>
              <motion.h3
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                MANAGEMENT
              </motion.h3>
              <h4>DRIVING STRATEGY AND PARTNERSHIPS.
              <motion.p
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                WE OVERSEE OPERATIONS, CLIENT OUTREACH, FINANCES, AND LOGISTICS — ENSURING AE RUNS LIKE A CONSULTING FIRM AND EVERY PROJECT TEAM HAS THE SUPPORT TO SUCCEED.
              </motion.p></h4>
            </div>
          </motion.div>
          <motion.div 
            className={styles.teamCard}
            whileHover={{ 
              y: -12, 
              scale: 1.03,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setExpandedTeam(3)}
          >
            <motion.div 
              className={styles.teamNumber}
              whileHover={{ 
                scale: 1.08,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              03
            </motion.div>
            <div className={styles.teamContent}>
              <motion.h3
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                CREATIVES
              </motion.h3>
              <h4>DESIGNING THE STORY AND EXPERIENCE.
              <motion.p
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                WE SHAPE AE'S BRAND THROUGH MARKETING, EVENTS, AND MEDIA — MAKING OUR WORK VISIBLE, ENGAGING, AND INSPIRING TO STUDENTS, CLIENTS, AND THE COMMUNITY.
              </motion.p></h4>
            </div>
          </motion.div>
        </div>
        
        {/* Roles Link */}
        <div className={styles.rolesLink}>
          <Link href="/roles">VIEW ALL ROLES</Link>
        </div>
      </section>

      {/* Team Detail Overlay */}
      {expandedTeam && (
        <motion.div
          className={styles.teamOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setExpandedTeam(null)}
        >
          <motion.div
            className={styles.overlayContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.closeButton}
              onClick={() => setExpandedTeam(null)}
            >
              ×
            </button>
            
            {teamDetails.find(team => team.id === expandedTeam) && (
              <div className={styles.teamDetailContent}>
                <motion.div 
                  className={styles.leftContent}
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: -80, opacity: 1 }}
                  transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div 
                    className={styles.teamNumberLarge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {String(expandedTeam).padStart(2, '0')}
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {teamDetails.find(team => team.id === expandedTeam)?.title}
                  </motion.h2>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {teamDetails.find(team => team.id === expandedTeam)?.subtitle}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {teamDetails.find(team => team.id === expandedTeam)?.description}
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className={styles.rightContent}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className={styles.detailSection}>
                    <h4>CORE SKILLS</h4>
                    <ul>
                      {teamDetails.find(team => team.id === expandedTeam)?.detailedContent.skills.map((skill, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* <div className={styles.detailSection}>
                    <h4>RECENT PROJECTS</h4>
                    <ul>
                      {teamDetails.find(team => team.id === expandedTeam)?.detailedContent.projects.map((project, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        >
                          {project}
                        </motion.li>
                      ))}
                    </ul>
                  </div> */}
                  
                  <div className={styles.detailSection}>
                    <h4>TOOLS & TECHNOLOGIES</h4>
                    <ul>
                      {teamDetails.find(team => team.id === expandedTeam)?.detailedContent.tools.map((tool, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                        >
                          {tool}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Family Section - Moved after Teams section as requested */}
      {/*
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
      */}

      {/* Timeline Section */}
      <section id="timeline" className={styles.timeline} ref={timelineRef}>
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
                        currentMonth === 'SEPTEMBER' && [4, 9, 10, 12, 15, 16, 17, 19, 20, 21, 22].includes(day) ? styles.eventCell : ''
                      }`}
                    >
                      {day}
                      {currentMonth === 'SEPTEMBER' && day === 4 && (
                        <div className={styles.eventIndicator}>Applications Open</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 9 && (
                        <div className={styles.eventIndicator}>Org Fair Tabling</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 10 && (
                        <div className={styles.eventIndicator}>Info Session #1</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 12 && (
                        <div className={styles.eventIndicator}>Board Apps Close</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 15 && (
                        <div className={styles.eventIndicator}>Info Session #2</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 16 && (
                        <div className={styles.eventIndicator}>Apps Close</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 17 && (
                        <div className={styles.eventIndicator}>Technical Interviews Begin</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 19 && (
                        <div className={styles.eventIndicator}>Technical Interviews End</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 20 && (
                        <div className={styles.eventIndicator}>Behavioural Interviews</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 21 && (
                        <div className={styles.eventIndicator}>Acceptances Sent</div>
                      )}
                      {currentMonth === 'SEPTEMBER' && day === 22 && (
                        <div className={styles.eventIndicator}>Welcome Dinner</div>
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
                
                {/* September */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('SEPTEMBER');
                    setExpandedMonth('SEPTEMBER');
                  }}
                >
                  <span className={styles.eventMonth}>SEPTEMBER</span>
                  {expandedMonth === 'SEPTEMBER' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>APPLICATIONS OPEN</span>
                          <span className={styles.eventDate}>09/05</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>STUDENT ORG FAIR TABLING</span>
                          <span className={styles.eventDate}>09/09</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>INFO SESSION #1</span>
                          <span className={styles.eventDate}>09/10</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>BOARD APPLICATIONS CLOSE</span>
                          <span className={styles.eventDate}>09/12</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>INFO SESSION #2</span>
                          <span className={styles.eventDate}>09/15</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>APPLICATIONS CLOSE</span>
                          <span className={styles.eventDate}>09/16</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>TECHNICAL INTERVIEWS BEGIN</span>
                          <span className={styles.eventDate}>09/17</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>TECHNICAL INTERVIEWS END</span>
                          <span className={styles.eventDate}>09/19</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>BEHAVIOURAL INTERVIEWS</span>
                          <span className={styles.eventDate}>09/20</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>ACCEPTANCES SENT</span>
                          <span className={styles.eventDate}>09/21</span>
                        </div>
                      </div>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>WELCOME DINNER</span>
                          <span className={styles.eventDate}>09/22</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* October */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('OCTOBER');
                    setExpandedMonth('OCTOBER');
                  }}
                >
                  <span className={styles.eventMonth}>OCTOBER</span>
                  {expandedMonth === 'OCTOBER' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>OCTOBER →</span>
                          <span className={styles.eventDate}>10/01</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* November */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('NOVEMBER');
                    setExpandedMonth('NOVEMBER');
                  }}
                >
                  <span className={styles.eventMonth}>NOVEMBER</span>
                  {expandedMonth === 'NOVEMBER' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>NOVEMBER →</span>
                          <span className={styles.eventDate}>11/01</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* December */}
                <div 
                  className={styles.timelineEvent}
                  onClick={() => {
                    setCurrentMonth('DECEMBER');
                    setExpandedMonth('DECEMBER');
                  }}
                >
                  <span className={styles.eventMonth}>DECEMBER</span>
                  {expandedMonth === 'DECEMBER' && (
                    <div className={styles.monthEvents}>
                      <div className={styles.eventGroup}>
                        <div className={styles.eventNameDate}>
                          <span className={styles.eventName}>DECEMBER →</span>
                          <span className={styles.eventDate}>12/01</span>
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
      </section>

      {/* Industry Modal */}
      {showIndustryModal && (
        <motion.div
          className={styles.industryModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowIndustryModal(false)}
        >
          <motion.div
            className={styles.industryModalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.industryModalClose}
              onClick={() => setShowIndustryModal(false)}
            >
              ×
            </button>
            
            <div className={styles.industryModalHeader}>
              <h2>About Us – For Industry</h2>
              <h3>Partner with SJSU's First Student-Led Engineering Consulting Club</h3>
            </div>

            <div className={styles.industryModalBody}>
              <p className={styles.industryIntro}>
                AE bridges the gap between academia and industry by giving companies, alumni, and faculty a direct channel to student talent. Our teams are structured like a professional consulting firm — with project managers, technical leads, developers, QA, and supporting roles in marketing, finance, and operations — ensuring reliability and high-quality deliverables.
              </p>

              <div className={styles.industrySection}>
                <h4>What We Offer Our Industry Partners</h4>
                
                <div className={styles.industryFeature}>
                  <h5>Real-World Project Execution</h5>
                  <p>Gain solutions to your software and engineering challenges, delivered by cross-functional student teams under faculty and alumni guidance.</p>
                </div>

                <div className={styles.industryFeature}>
                  <h5>Talent Pipeline</h5>
                  <p>Work directly with top SJSU students. Our members are rigorously recruited, trained, and mentored through workshops, technical bootcamps, and project quality gates.</p>
                </div>

                <div className={styles.industryFeature}>
                  <h5>Professionalism You Can Trust</h5>
                  <p>AE enforces consulting-style standards (design reviews, midterms, finals) to ensure every project meets expectations. Statements of Work are vetted through campus compliance for security and accountability.</p>
                </div>

                <div className={styles.industryFeature}>
                  <h5>Brand & Visibility</h5>
                  <p>Partners gain visibility on campus through showcases, events, and co-branded outreach. Students recognize and value companies that invest in their growth.</p>
                </div>
              </div>

              <div className={styles.industrySection}>
                <h4>Why Partner With AE?</h4>
                <ul className={styles.industryBenefits}>
                  <li>Access innovative, cost-effective solutions built by driven student engineers.</li>
                  <li>Build a recruiting pipeline from one of the most diverse engineering schools in Silicon Valley.</li>
                  <li>Contribute directly to student development while solving real problems.</li>
                </ul>
              </div>

              <div className={styles.industryCTA}>
                <p><strong>Interested in partnering?</strong> Contact our Consulting Partnerships Team to explore project opportunities, recruiter sessions, or sponsorships.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Students Modal */}
      {showStudentsModal && (
        <motion.div
          className={styles.studentsModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowStudentsModal(false)}
        >
          <motion.div
            className={styles.studentsModalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.studentsModalClose}
              onClick={() => setShowStudentsModal(false)}
            >
              ×
            </button>
            
            <div className={styles.studentsModalHeader}>
              <h2>About Us – For Students</h2>
              <h3>Gain the Experience That Sets You Apart</h3>
            </div>

            <div className={styles.studentsModalBody}>
              <p className={styles.studentsIntro}>
                AE is SJSU's first student-led engineering consulting club, designed to give students the hands-on, real-world experience that recruiters look for — but rarely see on a college resume. Our members don't just attend meetings; they become consultants, project managers, technical leads, designers, and strategists. Every role mirrors industry standards, preparing you for internships and full-time jobs.
              </p>

              <div className={styles.studentsSection}>
                <h4>What You'll Get as a Member</h4>
                
                <div className={styles.studentsFeature}>
                  <h5>Real Projects with Real Clients</h5>
                  <p>Work on professional-grade software and consulting projects for companies, alumni, and professors. Deliver solutions that go beyond the classroom.</p>
                </div>

                <div className={styles.studentsFeature}>
                  <h5>Career-Ready Skills</h5>
                  <p>Develop coding, project management, client communication, and teamwork skills in roles like Project Manager, Developer, QA Engineer, or Designer.</p>
                </div>

                <div className={styles.studentsFeature}>
                  <h5>Workshops & Training</h5>
                  <p>Learn cutting-edge skills in AI/ML, web development, and cloud computing through bootcamps, workshops, and peer-to-peer learning.</p>
                </div>

                <div className={styles.studentsFeature}>
                  <h5>A Strong Community</h5>
                  <p>Join a network of motivated peers, mentors, and alumni. Participate in events, showcases, and social activities that make AE more than just a club.</p>
                </div>
              </div>

              <div className={styles.studentsSection}>
                <h4>Why Join AE?</h4>
                <ul className={styles.studentsBenefits}>
                  <li>Build a portfolio of real client work you can showcase in interviews.</li>
                  <li>Gain access to recruiter sessions, career workshops, and alumni networks.</li>
                  <li>Take on leadership opportunities in management, creative, and technical roles.</li>
                  <li>Graduate with more than just a degree — graduate with work experience.</li>
                </ul>
              </div>

              <div className={styles.studentsCTA}>
                <p><strong>Interested in joining?</strong> Apply through our Talent Team and start your journey.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
     
    </main>
  );
}
