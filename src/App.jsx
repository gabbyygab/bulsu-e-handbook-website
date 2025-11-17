import { useEffect } from 'react'
import './App.css'
import TextType from './TextType'
import CardSwap, { Card } from './CardSwap'

const featureCards = [
  {
    title: 'My Schedule Builder',
    description:
      'Plot every subject with fixed day, start time, end time, room, and teacher so the entire week is visible before classes start.',
    tags: ['Subjects', 'Day & Time', 'Teacher Cards'],
  },
  {
    title: 'Static Handbook Library',
    description:
      'All handbook chapters, program regulations, and syllabi are packaged inside the APK for offline viewing.',
    tags: ['PDF Viewer', 'Policies', 'Course Guides'],
  },
  {
    title: 'Campus Resources',
    description:
      'Forms, academic calendar snapshots, and campus maps are bundled for easy download and print.',
    tags: ['Registrar', 'Calendar', 'Maps'],
  },
  {
    title: 'Student Support Hub',
    description:
      'Directory cards highlight departments, organizations, and helplines without needing live data.',
    tags: ['Directory', 'Services', 'Contacts'],
  },
]

const reactBitsCards = [
  {
    title: 'Schedule Grid',
    badge: 'Layered Card',
    description:
      'A layered card shows how My Schedule stacks each day with color-coded subjects for clarity.',
    bullets: ['Weekly grid snapshot', 'Conflict-free preview', 'Static data entry'],
  },
  {
    title: 'Teacher & Room Notes',
    badge: 'Layered Card',
    description:
      'Attach instructor names, consultation hours, and room numbers to every block so the APK mirrors your printed planner.',
    bullets: ['Instructor focus', 'Room reference', 'Offline-friendly'],
  },
  {
    title: 'Download Center',
    badge: 'Layered Card',
    description:
      'Showcase registrar forms, request slips, and campus maps inside a bold neon card that guides users to static downloads.',
    bullets: ['Registrar-ready PDFs', 'Campus map bundle', 'Contact list'],
  },
]

const quickAccess = [
  {
    title: 'Downloadable Forms',
    detail: 'Adding/Changing, Dropping, Registrar requests—ready for offline use.',
    badge: 'Registrar Ready',
  },
  {
    title: 'Campus Essentials',
    detail: 'Maps, academic calendar, and contact directory for quick navigation.',
    badge: 'Wayfinding',
  },
  {
    title: 'Knowledge Base',
    detail: 'Histories, hymns, and university highlights for every scholar.',
    badge: 'Culture',
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
            BulSU E-Handbook is a static Android companion. Install it once to read
            policies, grab forms, and use the My Schedule feature that lets you build your
            entire timetable inside the app.
          </p>
          <div className="cta-group">
            <a className="btn btn--primary" href="/BulSU-E-Handbook.apk" download>
              Download APK
            </a>
            <a className="btn btn--secondary" href="#download">
              View Install Steps
            </a>
          </div>
          <ul className="hero__stats">
            <li>
              <span>4</span>
              Core navigation hubs
            </li>
            <li>
              <span>20+</span>
              Handbook sections
            </li>
            <li>
              <span>100%</span>
              Offline ready content
            </li>
          </ul>
        </div>
        <div className="hero__preview" aria-hidden="true">
          <div className="hero__cards">
            <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
              <Card>
                <img src="https://placehold.co/320x180?text=My+Schedule" alt="My Schedule placeholder" />
                <h3>Schedule Builder</h3>
                <p>Stack fixed subjects by day, time, room, and teacher before the semester starts.</p>
              </Card>
              <Card>
                <img src="https://placehold.co/320x180/1b5e20/ffffff?text=Forms+Bundle" alt="Download forms placeholder" />
                <h3>Download Center</h3>
                <p>Static registrar forms, campus maps, and contacts packaged in the APK.</p>
              </Card>
              <Card>
                <img src="https://placehold.co/320x180/0f1f13/8bc34a?text=Teacher+Notes" alt="Teacher notes placeholder" />
                <h3>Teacher Notes</h3>
                <p>Keep faculty names, consultation hours, and room reminders offline.</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </header>

      <section className="section highlights section--grid" id="features" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__orb section__orb--lime" />
          <span className="section__mesh section__mesh--diagonal" />
        </div>
        <header className="section__header">
          <p className="section__eyebrow">Designed for IT students</p>
          <h2>Tech-themed experience that mirrors the Android app</h2>
          <p>Every tile below highlights static bundles already packaged inside the APK.</p>
        </header>
        <div className="feature-grid" data-animate="grid">
          {featureCards.map((card, index) => (
            <article
              className="feature-card"
              key={card.title}
              data-animate="card"
              data-tilt
              style={{ '--stagger': index }}
            >
              <span className="feature-card__chip">{card.title.split(' ')[0]}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul>
                {card.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
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
          <p className="section__eyebrow">Layered UI preview</p>
          <h2>Cards that mirror the app experience</h2>
          <p>
            These static cards mimic the bold neon panels used inside the APK, giving a
            visual taste of how My Schedule, teacher notes, and the download center look
            once the app is installed.
          </p>
        </header>
        <div className="bits-grid" data-animate="grid">
          {reactBitsCards.map((card, index) => (
            <article
              className="bits-card"
              key={card.title}
              data-animate="card"
              data-tilt
              style={{ '--stagger': index }}
            >
              <span className="bits-card__badge">{card.badge}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section quick-access section--split" id="services" data-animate="section">
        <div className="section__decor" aria-hidden="true">
          <span className="section__orb section__orb--amber" />
          <span className="section__stripe" />
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
        <div className="quick-access__copy" data-animate="content">
          <h2>Everything you need from day one</h2>
          <p>
            The BulSU E-Handbook keeps your go-to campus resources one tap away—no signal
            required once installed. The Android app bundles forms, directories, schedule
            templates, and knowledge bases so you can build your semester offline.
          </p>
          <a className="link-arrow" href="#download">
            See how to install
          </a>
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
          <a className="btn btn--primary" href="/BulSU-E-Handbook.apk" download>
            Download latest APK
          </a>
          <p>
            Need updates? <a href="mailto:bulsu.handbook@edu.ph">Contact the dev team</a>
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>BulSU E-Handbook · Bustos Campus · Built with Material Design 3</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  )
}

export default App
