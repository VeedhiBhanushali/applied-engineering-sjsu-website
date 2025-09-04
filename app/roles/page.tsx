'use client';

import { useState } from 'react';
import styles from './roles.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Role {
  title: string;
  responsibilities: string[];
  resumeBullet: string;
}

interface Team {
  name: string;
  description: string;
  roles: Role[];
}

interface Pillar {
  name: string;
  description: string;
  teams: Team[];
}

export default function Roles() {
  const [selectedPillar, setSelectedPillar] = useState<string>('Technical');

  const pillars: Pillar[] = [
    {
      name: "Technical",
      description: "Building the future through code and innovation",
      teams: [
        {
          name: "Projects",
          description: "End-to-end software development and client delivery",
          roles: [
            {
              title: "Project Manager",
              responsibilities: [
                "Define project scope, timeline, and deliverables with client",
                "Create schedules and assign tasks",
                "Facilitate standups, resolve blockers",
                "Act as client point of contact and manage expectations"
              ],
              resumeBullet: "Managed software projects end-to-end, led client communications, coordinated 5–8 person teams"
            },
            {
              title: "Technical Lead",
              responsibilities: [
                "Decide frameworks, tools, and architecture",
                "Mentor developers and review code",
                "Enforce coding standards, version control, testing",
                "Present technical decisions and demos to clients"
              ],
              resumeBullet: "Led technical direction, enforced standards, mentored team, designed architecture"
            },
            {
              title: "Developer",
              responsibilities: [
                "Write clean, efficient code for assigned modules",
                "Participate in code reviews and documentation",
                "Collaborate with QA to debug and test",
                "Deliver features on time for demos"
              ],
              resumeBullet: "Developed production-ready code in agile sprints, collaborated on client projects"
            },
            {
              title: "QA Engineer",
              responsibilities: [
                "Write and run test cases for features",
                "Enforce quality gates (DR1, DR2, Midterm, Final)",
                "Log and track bugs with developers",
                "Verify deliverables meet client standards"
              ],
              resumeBullet: "Tested client software, enforced quality standards, ensured bug-free deliverables"
            }
          ]
        },
        {
          name: "Workshops",
          description: "Technical education and skill development",
          roles: [
            {
              title: "Workshop Instructor",
              responsibilities: [
                "Run coding bootcamps and advanced sessions (web, AI/ML, cloud)",
                "Develop tutorials, slides, and self-paced resources",
                "Host guest speakers and Q&A panels",
                "Maintain AE's technical learning library"
              ],
              resumeBullet: "Led coding workshops, developed technical curriculum, created resource library"
            }
          ]
        },
        {
          name: "Talent",
          description: "Recruitment and member development",
          roles: [
            {
              title: "Recruiter & Onboarding Coordinator",
              responsibilities: [
                "Manage applications, interviews, and assessments",
                "Run onboarding bootcamps for new members",
                "Track member progress and training",
                "Monitor engagement and retention"
              ],
              resumeBullet: "Coordinated recruitment funnel, onboarded new members, tracked growth metrics"
            }
          ]
        }
      ]
    },
    {
      name: "Management",
      description: "Strategic operations and business development",
      teams: [
        {
          name: "Consulting Partnerships",
          description: "Client relations and business development",
          roles: [
            {
              title: "Client Relations Manager",
              responsibilities: [
                "Reach out to companies, professors, alumni for projects",
                "Manage client communications during projects",
                "Draft and manage Statements of Work with SJSU compliance",
                "Build long-term partnerships and referrals"
              ],
              resumeBullet: "Managed client outreach, negotiated partnerships, maintained project pipeline"
            }
          ]
        },
        {
          name: "Industry Relations",
          description: "Professional development and networking",
          roles: [
            {
              title: "Professional Development Lead",
              responsibilities: [
                "Organize recruiter sessions and career events",
                "Manage AE's LinkedIn presence for professional branding",
                "Host career readiness events (resume reviews, interview prep)",
                "Engage alumni for networking and workshops"
              ],
              resumeBullet: "Organized recruiter partnerships, hosted professional workshops, grew alumni network"
            }
          ]
        },
        {
          name: "Finance & Compliance",
          description: "Financial oversight and regulatory compliance",
          roles: [
            {
              title: "Treasurer & Budget Analyst",
              responsibilities: [
                "Track accounts, budgets, and project/event spending",
                "Process reimbursements and fundraising",
                "File compliance paperwork and educate members",
                "Publish financial reports for transparency"
              ],
              resumeBullet: "Managed budgets, ensured compliance, coordinated reimbursements and fundraising"
            }
          ]
        },
        {
          name: "Operations",
          description: "Internal systems and logistics",
          roles: [
            {
              title: "Operations Coordinator",
              responsibilities: [
                "Manage Discord, website, and scheduling systems",
                "Secure rooms, labs, equipment, and procurement",
                "Maintain documentation for workflows",
                "Ensure safety and compliance with campus standards"
              ],
              resumeBullet: "Managed internal systems and logistics, optimized workflows, ensured compliance"
            }
          ]
        }
      ]
    },
    {
      name: "Creatives",
      description: "Brand, marketing, and community engagement",
      teams: [
        {
          name: "Marketing & Communications",
          description: "Digital presence and brand messaging",
          roles: [
            {
              title: "Social Media Manager",
              responsibilities: [
                "Manage Instagram, LinkedIn, and other platforms",
                "Publish newsletters and announcements",
                "Share project stories and student journeys",
                "Run campaigns for recruitment and events"
              ],
              resumeBullet: "Managed social media and campaigns, wrote newsletters, promoted projects"
            }
          ]
        },
        {
          name: "Graphic Design & Media",
          description: "Visual design and multimedia content",
          roles: [
            {
              title: "Creative Designer",
              responsibilities: [
                "Create graphics, logos, and templates",
                "Capture photos/videos at events",
                "Maintain AE's media library",
                "Produce reels, highlight videos, and creative campaigns"
              ],
              resumeBullet: "Designed brand assets, produced event media, created multimedia campaigns"
            }
          ]
        },
        {
          name: "Events & Engagement",
          description: "Community building and event coordination",
          roles: [
            {
              title: "Event Coordinator",
              responsibilities: [
                "Host student-facing events (mixers, info sessions)",
                "Run end-of-semester showcases for clients",
                "Collaborate with other orgs on hackathons/fairs",
                "Build community through socials and bonding events"
              ],
              resumeBullet: "Organized student/community events, coordinated client showcases, managed collaborations"
            }
          ]
        }
      ]
    }
  ];

  const selectedPillarData = pillars.find(p => p.name === selectedPillar);

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink}>
          <img src="/ae-logo.png" alt="AE Logo" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <Link href="/#about">ABOUT</Link>
          <Link href="/#teams">TEAMS</Link>
          <Link href="/#family">FAMILY</Link>
          <Link href="/#timeline">TIMELINE</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/roles" className={styles.activeNav}>ROLES</Link>
          <Link href="/contact" className={styles.contactBtn}>
            CONTACT
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
          </Link>
        </nav>
      </header>

      {/* Roles Content Section */}
      <section className={styles.rolesSection}>
        <div className={styles.rolesContainer}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <motion.h1 
              className={styles.pageTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              TEAM STRUCTURE
            </motion.h1>
            <motion.p 
              className={styles.pageSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              DISCOVER THE ROLES THAT DRIVE AE FORWARD
            </motion.p>
          </div>

          {/* Pillar Navigation */}
          <div className={styles.pillarNav}>
            {pillars.map((pillar) => (
              <button
                key={pillar.name}
                className={`${styles.pillarTab} ${selectedPillar === pillar.name ? styles.active : ''}`}
                onClick={() => setSelectedPillar(pillar.name)}
              >
                {pillar.name}
              </button>
            ))}
          </div>

          {/* Selected Pillar Content */}
          {selectedPillarData && (
            <motion.div 
              className={styles.pillarContent}
              key={selectedPillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.pillarHeader}>
                <h2>{selectedPillarData.name}</h2>
                <p>{selectedPillarData.description}</p>
              </div>

              <div className={styles.teamsGrid}>
                {selectedPillarData.teams.map((team, index) => (
                  <motion.div 
                    key={team.name}
                    className={styles.teamCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={styles.teamHeader}>
                      <h3>{team.name}</h3>
                      <p>{team.description}</p>
                    </div>

                    <div className={styles.rolesGrid}>
                      {team.roles.map((role) => (
                        <div key={role.title} className={styles.roleCard}>
                          <h4>{role.title}</h4>
                          <div className={styles.roleDetails}>
                            <div className={styles.responsibilities}>
                              <h5>KEY RESPONSIBILITIES</h5>
                              <ul>
                                {role.responsibilities.map((responsibility, index) => (
                                  <li key={index}>{responsibility}</li>
                                ))}
                              </ul>
                            </div>
                            <div className={styles.resumeBullet}>
                              <h5>RESUME IMPACT</h5>
                              <p>{role.resumeBullet}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}