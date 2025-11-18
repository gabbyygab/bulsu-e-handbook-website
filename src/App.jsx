import { useEffect, useState } from 'react'
import './App.css'
import TextType from './TextType'
import CardSwap, { Card } from './CardSwap'
import { Home, Sparkles, BookOpen, FileText, Download, Mail, Menu, X } from 'lucide-react'
import { getDownloadCount, incrementDownloadCount } from './firebase/firebase'

const featureCards = [
  {
    title: 'Tools - My Schedule & Timetable Management',
    description:
      'Build your weekly schedule with dual view modes: Table view for the entire week grid (8 AM - 8 PM) and Card view for organized day-by-day listings. Color-coded subjects with teachers and rooms.',
    tags: ['Table View', 'Card View', 'Multi-Schedule'],
  },
  {
    title: 'Grade Calculator - BulSU System',
    description:
      'Calculate grades accurately using BulSU\'s official weighted system: Attendance (10%), Quizzes (30%), Projects (40%), Exams (20%). Converts to BulSU grade scale (1.00-5.00).',
    tags: ['BulSU Grading', 'GWA', 'Pass/Fail'],
  },
  {
    title: 'Academic Resources',
    description:
      'Access complete course curriculum for all programs (BSIT, BSBA, BSE, BEED, BSIE, BIT), academic regulations, grading standards, and general provisions—all offline.',
    tags: ['Curriculum', 'Regulations', 'Policies'],
  },
  {
    title: 'Campus Information Hub',
    description:
      'Complete department directory, faculty information for all colleges (CICS, CBA, COED, COE), student organizations (LSC, AIES, ASICS), and BulSU history, hymn, and march.',
    tags: ['Departments', 'Faculty', 'Organizations'],
  },
  {
    title: 'Downloadable Forms Center',
    description:
      'Access registrar forms (adding/changing, dropping), student affairs documents, academic calendar, and campus maps. All resources bundled for offline use.',
    tags: ['Registrar', 'Forms', 'Calendar'],
  },
  {
    title: 'Student Services',
    description:
      'Guidance and counseling services, student affairs information, university contacts, and academic awards info including Latin Honors and Gold Gear Awards.',
    tags: ['Services', 'Guidance', 'Awards'],
  },
]

const reactBitsCards = [
  {
    title: 'My Schedule - Dual View Modes',
    imageSrc: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231b5e20"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="24" text-anchor="middle" dy=".3em"%3ETable %26 Card View%3C/text%3E%3C/svg%3E',
    description:
      'Create multiple schedules for different semesters. Toggle between Table View (weekly grid timetable 8 AM-8 PM) and Card View (day-by-day listing). Add unlimited subjects with day, start/end time, location, and teacher. Automatic time conflict detection.',
  },
  {
    title: 'Grade Calculator - BulSU Compliance',
    imageSrc: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%232e7d32"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="24" text-anchor="middle" dy=".3em"%3EGWA Calculator%3C/text%3E%3C/svg%3E',
    description:
      'Input scores for Attendance & Recitation (10%), Quizzes & Written Works (30%), Activities & Projects (40%), and Term Examination (20%). Get your final percentage, BulSU grade (1.00-5.00), GWA equivalent, and pass/fail status. Detailed component breakdown included.',
  },
  {
    title: 'Campus Resources & Directory',
    imageSrc: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23388e3c"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="24" text-anchor="middle" dy=".3em"%3ECampus Info%3C/text%3E%3C/svg%3E',
    description:
      'Complete department directory for all colleges (CICS, CBA, COED, COE, BIT), faculty information, student organizations directory (LSC, AIES, ASICS, OMG, Lingua Franca), downloadable forms, academic calendar, campus maps, and BulSU identity (hymn, march, history).',
  },
  {
    title: 'Academic Information Center',
    imageSrc: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%2343a047"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="24" text-anchor="middle" dy=".3em"%3EAcademic Hub%3C/text%3E%3C/svg%3E',
    description:
      'Access course curriculum for all programs (BSIT, BSBA, BSE, BEED, BSIE, BIT with specializations), academic regulations including grading system and standards, attendance policies, examination procedures, general provisions with vision and mission, and student rights and responsibilities.',
  },
  {
    title: 'Student Services & Awards',
    imageSrc: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%234caf50"/%3E%3Ctext x="50%25" y="50%25" fill="white" font-size="24" text-anchor="middle" dy=".3em"%3EStudent Services%3C/text%3E%3C/svg%3E',
    description:
      'Student affairs information, guidance and counseling services, Latin Honors requirements and criteria, Gold Gear Awards for engineering excellence, graduation awards categories, university contacts, and downloadable forms and templates for various academic processes.',
  },
]

const quickAccess = [
  {
    title: 'My Schedule Builder',
    detail: 'Build your complete weekly timetable with Table and Card views. Add subjects with day, time, room, and teacher. Create multiple schedules for different semesters.',
    badge: 'Schedule Tools',
  },
  {
    title: 'Grade Calculator',
    detail: 'Calculate your grades using BulSU\'s official weighted system. Get instant GWA conversion, detailed breakdown, and pass/fail status based on BulSU standards.',
    badge: 'Academic Tools',
  },
  {
    title: 'Downloadable Forms',
    detail: 'Adding/Changing forms, Dropping forms, registrar requests, student affairs documents—all bundled for offline access and printing.',
    badge: 'Registrar Ready',
  },
  {
    title: 'Campus Directory',
    detail: 'Complete faculty directory for all colleges, department information, student organizations list (LSC, AIES, ASICS), and university contacts.',
    badge: 'Information Hub',
  },
  {
    title: 'Academic Resources',
    detail: 'Course curriculum for all programs (BSIT, BSBA, BSE, BEED, BSIE, BIT), academic regulations, grading standards, examination procedures.',
    badge: 'Knowledge Base',
  },
  {
    title: 'BulSU Identity',
    detail: 'University history, BulSU Hymn with lyrics, BulSU March, vision and mission statements, core values, and institutional philosophy.',
    badge: 'Culture & Heritage',
  },
]

const downloadSteps = [
  {
    title: 'Install the APK',
    detail:
      'Download the latest BulSU E-Handbook APK and sideload it to your Android device.',
  },
  {
    title: 'Enable Trusted Sources',
    detail:
      'Allow installs from trusted sources in Settings to complete the installation.',
  },
  {
    title: 'Launch & Explore',
    detail:
      'Open the app to access the full handbook, services, and scheduling features immediately.',
  },
]

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [downloadCount, setDownloadCount] = useState(0)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openModal = (card) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCard(null), 300) // Wait for animation to complete
  }

  const handleDownload = async () => {
    await incrementDownloadCount()
    // Refresh the count after incrementing
    const newCount = await getDownloadCount()
    setDownloadCount(newCount)
  }

  // Fetch download count on mount
  useEffect(() => {
    const fetchDownloadCount = async () => {
      const count = await getDownloadCount()
      setDownloadCount(count)
    }
    fetchDownloadCount()
  }, [])

  // Prevent body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isModalOpen])

  useEffect(() => {
    const animatedElements = document.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  useEffect(() => {
    const tiltElements = document.querySelectorAll('[data-tilt]')

    const handlePointerMove = (el) => (event) => {
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      const rotateX = y * -8
      const rotateY = x * 12

      el.style.setProperty('--tilt-rotate-x', `${rotateX}deg`)
      el.style.setProperty('--tilt-rotate-y', `${rotateY}deg`)
      el.style.setProperty('--tilt-elevation', '-2px')
    }

    const handlePointerLeave = (el) => () => {
      el.style.setProperty('--tilt-rotate-x', '0deg')
      el.style.setProperty('--tilt-rotate-y', '0deg')
      el.style.setProperty('--tilt-elevation', '0px')
    }

    const listeners = Array.from(tiltElements).map((el) => {
      const moveHandler = handlePointerMove(el)
      const leaveHandler = handlePointerLeave(el)
      el.addEventListener('pointermove', moveHandler)
      el.addEventListener('pointerleave', leaveHandler)
      el.addEventListener('pointerup', leaveHandler)
      el.addEventListener('pointercancel', leaveHandler)
      return { el, moveHandler, leaveHandler }
    })

    return () => {
      listeners.forEach(({ el, moveHandler, leaveHandler }) => {
        el.removeEventListener('pointermove', moveHandler)
        el.removeEventListener('pointerleave', leaveHandler)
        el.removeEventListener('pointerup', leaveHandler)
        el.removeEventListener('pointercancel', leaveHandler)
      })
    }
  }, [])

  return (
    <div className="app-shell">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <Menu className="mobile-menu-toggle__icon" />
      </button>

      {/* Mobile Side Menu */}
      <div className={`mobile-side-menu ${isMobileMenuOpen ? 'mobile-side-menu--open' : ''}`}>
        <div className="mobile-side-menu__header">
          <h2>Menu</h2>
          <button className="mobile-side-menu__close" onClick={closeMobileMenu} aria-label="Close menu">
            <X />
          </button>
        </div>
        <nav className="mobile-side-menu__nav">
          <a href="#top" className="mobile-side-menu__link" onClick={closeMobileMenu}>
            <Home className="mobile-side-menu__icon" />
            <span>Home</span>
          </a>
          <a href="#features" className="mobile-side-menu__link" onClick={closeMobileMenu}>
            <Sparkles className="mobile-side-menu__icon" />
            <span>Features</span>
          </a>
          <a href="#reactbits" className="mobile-side-menu__link" onClick={closeMobileMenu}>
            <BookOpen className="mobile-side-menu__icon" />
            <span>Handbook</span>
          </a>
          <a href="#services" className="mobile-side-menu__link" onClick={closeMobileMenu}>
            <FileText className="mobile-side-menu__icon" />
            <span>Services</span>
          </a>
          <a href="#download" className="mobile-side-menu__link" onClick={closeMobileMenu}>
            <Download className="mobile-side-menu__icon" />
            <span>Download</span>
          </a>
          <a href="#contact" className="mobile-side-menu__link" onClick={closeMobileMenu}>
            <Mail className="mobile-side-menu__icon" />
            <span>Contact</span>
          </a>
        </nav>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      <header className="hero" id="top">
        <div className="hero__content">
          <p className="hero__eyebrow">BulSU Bustos Campus · Official Companion</p>
          <h1>
            BulSU <span>E-Handbook</span>
          </h1>
          <div className="hero__typing">
            <TextType
              text={['Static BulSU companion', 'Download once, use offline', 'My Schedule builder ready']}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
          <p className="hero__subtitle">
            BulSU E-Handbook is your complete campus companion for Bulacan State University - Bustos Campus.
            Access curriculum, policies, and resources offline. Build your schedule with dual view modes.
            Calculate grades with BulSU's official system. Everything you need, no internet required.
          </p>
          <div className="cta-group">
            <a className="btn btn--primary" href="/bulsuEHandBook.apk" download onClick={handleDownload}>
              Download APK
            </a>
            <a className="btn btn--secondary" href="#download">
              View Install Steps
            </a>
          </div>
          <ul className="hero__stats">
            <li>
              <span>{downloadCount.toLocaleString()}</span>
              Total downloads
            </li>
            <li>
              <span>5</span>
              Core feature modules
            </li>
            <li>
              <span>12+</span>
              Academic programs
            </li>
            <li>
              <span>100%</span>
              Offline functionality
            </li>
          </ul>
        </div>
        <div className="hero__preview hero__preview--desktop" aria-hidden="true">
          <div className="hero__cards">
            <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
              <Card>
                <img src="https://placehold.co/320x180?text=My+Schedule" alt="My Schedule with dual views" />
                <h3>My Schedule</h3>
                <p>Dual view modes: Table grid (8 AM-8 PM) and Card view. Create multiple schedules with time conflict detection.</p>
              </Card>
              <Card>
                <img src="https://placehold.co/320x180/1b5e20/ffffff?text=Grade+Calculator" alt="BulSU Grade Calculator" />
                <h3>Grade Calculator</h3>
                <p>BulSU-compliant grading system with weighted components. Get GWA, grade scale, and pass/fail status instantly.</p>
              </Card>
              <Card>
                <img src="https://placehold.co/320x180/0f1f13/8bc34a?text=Campus+Resources" alt="Campus directory and resources" />
                <h3>Campus Resources</h3>
                <p>Complete directory for all colleges, faculty, organizations, forms, curriculum, and BulSU identity.</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </header>

      <nav className="nav-bar nav-bar--desktop">
        <div className="nav-bar__container">
          <a href="#top" className="nav-card">
            <Home className="nav-card__icon" />
            <span className="nav-card__label">Home</span>
          </a>
          <a href="#features" className="nav-card">
            <Sparkles className="nav-card__icon" />
            <span className="nav-card__label">Features</span>
          </a>
          <a href="#reactbits" className="nav-card">
            <BookOpen className="nav-card__icon" />
            <span className="nav-card__label">Handbook</span>
          </a>
          <a href="#services" className="nav-card">
            <FileText className="nav-card__icon" />
            <span className="nav-card__label">Services</span>
          </a>
          <a href="#download" className="nav-card">
            <Download className="nav-card__icon" />
            <span className="nav-card__label">Download</span>
          </a>
          <a href="#contact" className="nav-card">
            <Mail className="nav-card__icon" />
            <span className="nav-card__label">Contact</span>
          </a>
        </div>
      </nav>

      <section className="section highlights section--grid" id="features" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__orb section__orb--lime" />
          <span className="section__mesh section__mesh--diagonal" />
        </div>
        <header className="section__header">
          <p className="section__eyebrow">Designed for BulSU Bustos Campus</p>
          <h2>Comprehensive features for your academic journey</h2>
          <p>Schedule management, grade calculation, campus resources, and academic information—all accessible offline once installed.</p>
        </header>
        <div className="feature-grid" data-animate="grid">
          {featureCards.map((card, index) => (
            <article
              className="feature-card"
              key={card.title}
              data-animate="card"
              data-tilt
              style={{ '--stagger': index }}
              onClick={() => openModal(card)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openModal(card)
                }
              }}
            >
              <span className="feature-card__chip">{card.title.split(' ')[0]}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="feature-card__hint">Click to view details</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bits section--signal" id="reactbits" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__halo section__halo--emerald" />
          <span className="section__mesh section__mesh--dots" />
        </div>
        <header className="section__header">
          <p className="section__eyebrow">BulSU Bustos E-Handbook Core Features</p>
          <h2>Powerful tools designed for students</h2>
          <p>
            From dual-view schedule management to BulSU-compliant grade calculation, comprehensive campus directories
            to complete academic resources—everything works offline once installed. Built with Material Design 3
            and tech-themed aesthetics perfect for IT students.
          </p>
        </header>
        <div className="bits-grid" data-animate="grid">
          {reactBitsCards.map((card, index) => (
            <article
              className="bits-card-simple"
              key={card.title}
              data-animate="card"
              data-tilt
              style={{ '--stagger': index }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section quick-access section--split" id="services" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__orb section__orb--amber" />
          <span className="section__stripe" />
        </div>
        <div className="quick-access__header" data-animate="content">
          <h2>Everything you need from day one</h2>
          <p>
            BulSU E-Handbook is your complete campus companion providing schedule building, grade calculation,
            curriculum access, faculty directories, downloadable forms, and BulSU identity resources.
            All features work offline—no internet required after installation. Perfect for students across
            all programs: BSIT, BSBA, BSE, BEED, BSIE, and BIT specializations.
          </p>
          <a className="link-arrow" href="#download">
            Download APK now
          </a>
        </div>
        <div className="quick-access__grid" data-animate="grid">
          {quickAccess.map((item, index) => (
            <article
              className="quick-card"
              key={item.title}
              data-animate="card"
              data-tilt
              style={{ '--stagger': index }}
            >
              <span className="quick-card__badge">{item.badge}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section download section--grid" id="download" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__mesh section__mesh--columns" />
          <span className="section__halo section__halo--mint" />
        </div>
        <header className="section__header">
          <p className="section__eyebrow">Get the APK</p>
          <h2>Download BulSU E-Handbook today</h2>
          <p>Follow these quick steps to sideload the latest build on any Android 7.0+ device.</p>
        </header>
        <div className="download__steps" data-animate="grid">
          {downloadSteps.map((step, index) => (
            <article
              className="step-card"
              key={step.title}
              data-animate="card"
              data-tilt
              style={{ '--stagger': index }}
            >
              <span className="step-card__index">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
        <div className="download__cta" data-animate="content">
          <a className="btn btn--primary" href="/bulsuEHandBook.apk" download onClick={handleDownload}>
            Download latest APK
          </a>
          <p>
            Need updates? <a href="mailto:bulsu.handbook@edu.ph">Contact the dev team</a>
          </p>
        </div>
      </section>

      <section className="section contact section--grid" id="contact" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__orb section__orb--lime" />
          <span className="section__mesh section__mesh--diagonal" />
        </div>
        <header className="section__header">
          <p className="section__eyebrow">Get in touch</p>
          <h2>Contact Us</h2>
          <p>Have organization names to add or updates to suggest? We'd love to hear from you!</p>
        </header>
        <div className="contact__cta" data-animate="content">
          <a className="btn btn--primary" href="mailto:delicanagabriel1212@gmail.com?subject=Organization%20Name%20Addition%20or%20Update">
            Contact Us
          </a>
          <p>
            Email us at <a href="mailto:delicanagabriel1212@gmail.com">delicanagabriel1212@gmail.com</a> for adding organization names and updates.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>BulSU E-Handbook · Bustos Campus · Built with Material Design 3</p>
        <a href="#top">Back to top</a>
      </footer>

      {/* Feature Card Modal */}
      {isModalOpen && selectedCard && (
        <div className={`modal-overlay ${isModalOpen ? 'modal-overlay--open' : ''}`} onClick={closeModal}>
          <div className={`modal-content ${isModalOpen ? 'modal-content--open' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <X />
            </button>
            <div className="modal-header">
              <span className="modal-chip">{selectedCard.title.split(' ')[0]}</span>
              <h2>{selectedCard.title}</h2>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedCard.description}</p>
              {selectedCard.tags && selectedCard.tags.length > 0 && (
                <div className="modal-tags">
                  <h3>Key Features:</h3>
                  <ul>
                    {selectedCard.tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="modal-cta">
                <a className="btn btn--primary" href="/bulsuEHandBook.apk" download onClick={handleDownload}>
                  Download APK to Access
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
