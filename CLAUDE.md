# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BulSU E-Handbook** is a modern web application for Bulacan State University's Bustos Campus. The app serves as a comprehensive campus companion providing students with access to university resources and information.

**Technology Stack:**
- **Language:** JavaScript/JSX
- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP, Motion (Framer Motion)
- **3D Graphics:** Three.js
- **Backend/Database:** Firebase 12.6.0
- **Icons:** Lucide React
- **Type:** Single Page Application (SPA)

## Build and Development Commands

### Development Server
```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Preview production build
npm run preview
```

### Building the Application
```bash
# Build for production (outputs to dist/)
npm run build

# Install dependencies
npm install
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix
```

## Application Architecture

### Current Structure
The app uses a **React Single Page Application (SPA)** architecture:

```
src/
├── App.jsx              # Main application component
├── App.css              # Application styles
├── index.css            # Global styles (Tailwind)
├── main.jsx             # React entry point
├── firebase/
│   └── firebase.js      # Firebase configuration and initialization
├── components/          # Reusable React components
│   ├── TextType.jsx
│   ├── CardSwap.jsx
│   └── TiltedCard.jsx
├── apk/                 # Android APK files (if any)
└── documentation/       # Documentation files
```

### Key Components

1. **App.jsx** - Main application component
   - Landing page with animated hero section
   - Feature cards showcasing app capabilities
   - Responsive navigation with mobile menu
   - Interactive UI elements with GSAP animations

2. **Firebase Integration** (`src/firebase/firebase.js`)
   - Firebase initialization
   - Authentication setup
   - Firestore database configuration
   - Storage configuration

### Project Structure

**Source Files:** `src/`
- React components (.jsx)
- Styling files (.css)
- Firebase configuration
- Assets and static resources

**Public Assets:** `public/`
- Static files served directly
- APK downloads
- Images and icons

**Configuration Files:** (root)
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration (if present)
- `eslint.config.js` - ESLint rules
- `package.json` - Dependencies and scripts

## Firebase Integration

### Firebase Setup

**Location:** `src/firebase/firebase.js`

This project uses Firebase 12.6.0 for backend services. The Firebase configuration file should contain:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Firebase Services

**Authentication (`getAuth`):**
- User login/registration (if needed)
- Session management
- Anonymous authentication for read-only access

**Firestore Database (`getFirestore`):**
- Store student schedules
- Save user preferences
- Cache downloadable forms metadata
- Store feedback and suggestions

**Cloud Storage (`getStorage`):**
- Host downloadable forms (PDFs)
- Store academic calendars
- Campus maps and resources

### Environment Variables

**IMPORTANT:** Never commit Firebase credentials to version control.

Create a `.env` file in the root directory:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then use in `firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

**Note:** Add `.env` to `.gitignore` to prevent credential leaks.

## Feature Set

### Implemented Features

**Landing Page:**
- Animated hero section with typewriter effect
- Feature showcase cards
- Responsive navigation with mobile menu
- Green university color scheme (#1B5E20, #2E7D32)

**Feature Cards:**
1. **My Schedule** - Timetable Management (Table & Card view)
2. **Grade Calculator** - BulSU grading system
3. **Academic Resources** - Curriculum and regulations
4. **Campus Information Hub** - Departments and faculty
5. **Downloadable Forms Center** - Registrar and student forms
6. **Student Services** - Guidance and awards info

### Features to Implement (From UI Design)

**1. Downloadable Forms Section:**
- Adding/Changing Form
- Dropping Form
- "View all" functionality for forms management

**2. About University:**
- History of BulSU
- Hymn and March

**3. Administration and Staff:**
- Faculty and Staff directory
- Admin Council information
- Directory of BulSU (organizational structure)

**4. Academic Information:**
- General Provisions
- Course Curriculum
- Program Offerings
- Academic Regulations

**5. Student Life and Governance:**
- Student Council
- Student Affairs
- External Affairs
- Student Organizations

**6. Institutional and Support Services:**
- Downloadable Forms (detailed forms access)
- Institutional Services

**7. Subject Scheduling (New Feature):**
- Add/edit/delete subjects
- Set class times (start time and end time)
- Assign days of the week (e.g., Monday/Wednesday/Friday)
- Weekly schedule view
- Conflict detection for overlapping schedules
- Semester/term management

## Navigation Structure

### Bottom Navigation Bar

The app uses a **BottomNavigationView** with 4 main sections (NO Profile tab since this is a static app):

1. **Home** 🏠
   - Main dashboard with Quick Access cards
   - Featured topics and FAQ sections
   - Search functionality
   - Student info display (name, ID) - read-only

2. **Department** 🏢
   - Administration and Staff
   - Faculty and Staff directory
   - Admin Council
   - Directory of BulSU

3. **Policies** 📋
   - Student Handbook
   - Academic Information
   - General Provisions
   - Academic Regulations
   - Course Curriculum

4. **Services** ⚙️
   - Downloadable Forms
   - Institutional Services
   - Campus Map
   - Academic Calendar
   - Contact Directory

**Navigation Implementation:**
- Use `BottomNavigationView` from Material Design 3
- Menu resource: `res/menu/bottom_navigation_menu.xml`
- Each tab loads corresponding content/fragment
- Selected state uses primary green color (#1B5E20)
- Unselected state uses gray (#757575)

Current navigation is basic Intent-based transitions. When expanding the app:

1. **Fragment-based Architecture:** Use fragments for each bottom nav section
2. **Navigation Component:** For complex navigation flows between features
3. **Deep Linking:** For direct access to specific sections (e.g., forms, schedules)

## Data Persistence Strategy

### Firebase Firestore (Cloud Database)

**For Dynamic User Data:**
```javascript
import { collection, doc, setDoc, getDoc, query, where } from 'firebase/firestore';
import { db } from './firebase/firebase';

// Collections:
// - schedules: User timetables
// - preferences: User settings
// - feedback: User feedback/suggestions
```

**For Static Content (Handbook, Regulations, etc.):**
- Store in `public/` folder as JSON or text files
- Bundle PDFs in Firebase Storage
- Use dynamic imports for large documents

**For Forms and Documents:**
- Store in Firebase Storage
- Provide download URLs
- Implement client-side caching with localStorage/sessionStorage

### Local Storage (Browser)
- Cache user preferences
- Store recently viewed pages
- Save draft schedules before Firebase sync

## Code Patterns and Conventions

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (buttons, cards, etc.)
│   ├── layout/         # Layout components (header, footer, nav)
│   └── features/       # Feature-specific components
├── pages/              # Page components (routes)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── contexts/           # React Context providers
├── services/           # API/Firebase service functions
└── constants/          # Constants and configuration
```

### React Component Patterns

**Function Components with Hooks:**
```javascript
import { useState, useEffect } from 'react';

function MyComponent() {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div>{/* JSX */}</div>
  );
}
```

**Custom Hooks for Firebase:**
```javascript
// hooks/useFirestore.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export function useCollection(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchData();
  }, [collectionName]);

  return { data, loading };
}
```

### Styling Conventions
- Use Tailwind CSS utility classes for styling
- Create custom CSS in component `.css` files only when necessary
- Follow BulSU color scheme (see Design System section)
- Responsive design: mobile-first approach

## Design System & Theme

### Tech-Themed Visual Identity

The web app features a **modern, clean design** with smooth animations and interactive elements, perfect for students while maintaining BulSU brand colors. Uses GSAP and Framer Motion for animations, with Tailwind CSS for styling.

### Color Palette

**Primary Green Shades (BulSU Brand Colors):**
- `#1B5E20` - Darkest Green (primary text, main branding)
- `#2E7D32` - Dark Green (secondary text, borders)
- `#388E3C` - Medium Green (gradients)
- `#43A047` - Green (gradients, accents)
- `#4CAF50` - Standard Green (tech elements)
- `#66BB6A` - Light Green (circuit nodes, tech accents)
- `#81C784` - Lighter Green (circuit nodes, highlights)
- `#8BC34A` - Lime Green (tech decorations)

**Background & Neutral:**
- `#FAFAFA` - Light background
- `#F5F5F5` - Secondary background
- `#FFFFFF` - White (cards, overlays)
- `#424242` - Dark gray (body text)

**Accent Colors:**
- White with semi-transparency (`#80FFFFFF`, `#60FFFFFF`) for circuit traces
- Dark overlay (`#30000000`) for depth

### Design Components

#### 1. Card Components

**Standard Card Pattern:**
```jsx
<div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
  <h3 className="text-xl font-bold text-[#1B5E20] mb-3">{title}</h3>
  <p className="text-gray-600">{description}</p>
</div>
```

**Feature Card with Icon:**
```jsx
<div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 bg-[#1B5E20] rounded-lg flex items-center justify-center">
      <Icon className="text-white" size={24} />
    </div>
    <h3 className="text-lg font-semibold text-[#1B5E20]">{title}</h3>
  </div>
  <p className="text-gray-600">{content}</p>
</div>
```

**IMPORTANT:** Use regular cards with proper information display. **DO NOT use TiltedCard component** - use standard rectangular cards with hover effects instead.

#### 2. Button Styles (Tailwind)

**Primary Button:**
```jsx
<button className="bg-gradient-to-r from-[#2E7D32] via-[#388E3C] to-[#43A047] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
  Button Text
</button>
```

**Secondary Button:**
```jsx
<button className="bg-white text-[#2E7D32] border-2 border-[#2E7D32] px-6 py-3 rounded-full font-semibold hover:bg-[#2E7D32] hover:text-white transition-all">
  Button Text
</button>
```

#### 3. Navigation Components

**Mobile Menu Toggle:**
```jsx
{isMobileMenuOpen ? (
  <X className="text-[#1B5E20]" size={24} />
) : (
  <Menu className="text-[#1B5E20]" size={24} />
)}
```

**Navigation Links:**
```jsx
<a href="#section" className="text-gray-700 hover:text-[#1B5E20] transition-colors">
  Link Text
</a>
```

### Typography Colors

**Headers:**
- University/App Name: `#1B5E20` (darkest green)
- Section Headers: `#2E7D32` (dark green)

**Body Text:**
- Primary: `#424242` (dark gray)
- Secondary: `#616161` (medium gray)

**Interactive Elements:**
- Links/Buttons: `#2E7D32` (dark green)
- Accent text: `#388E3C` (medium green)

### Animation Patterns

#### GSAP Animations

**Scroll-triggered animations:**
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.from('.feature-card', {
  scrollTrigger: '.feature-card',
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2
});
```

#### Framer Motion Animations

**Page transitions:**
```jsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

**Hover effects:**
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Layout Patterns

#### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

#### Container Pattern
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

#### Section Pattern
```jsx
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-[#1B5E20] mb-8">Section Title</h2>
    {/* Section content */}
  </div>
</section>
```

### Accessibility

- Minimum touch/click target: 44x44px (mobile), 48x48px (desktop)
- Text contrast ratios meet WCAG AA standards
- Dark green (#1B5E20) on white: 9.8:1 ✓
- Medium green (#2E7D32) on white: 7.4:1 ✓
- Semantic HTML elements (nav, main, section, article)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states for all interactive elements

### Responsive Design

**Tailwind Breakpoints:**
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)
- `2xl`: 1536px (extra large)

**Mobile-First Approach:**
```jsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

**Responsive Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Dark Mode Support (Future)

When implementing dark mode with Tailwind:
```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

Add to `tailwind.config.js`:
```javascript
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

## Subject Scheduling Implementation Guide

When implementing the subject scheduling feature:

### Firestore Data Structure

```javascript
// Collection: schedules/{userId}/subjects/{subjectId}
{
  id: "auto-generated",
  subjectName: "Data Structures",
  subjectCode: "CS201",
  instructor: "Dr. Smith",
  room: "Room 301",
  color: "#4CAF50",
  schedules: [
    {
      dayOfWeek: 1,  // 1=Monday, 2=Tuesday, ..., 7=Sunday
      startTime: "08:00",
      endTime: "09:30"
    },
    {
      dayOfWeek: 3,  // Wednesday
      startTime: "08:00",
      endTime: "09:30"
    }
  ],
  semester: "1st Semester 2024-2025",
  units: 3
}
```

### React Components Structure

```
src/
├── pages/
│   └── Schedule/
│       ├── SchedulePage.jsx       # Main schedule view
│       ├── TableView.jsx          # Weekly grid view (8AM-8PM)
│       ├── CardView.jsx           # Day-by-day card list
│       └── SubjectForm.jsx        # Add/Edit subject modal
├── components/
│   ├── SubjectCard.jsx            # Individual subject card
│   ├── TimeSlot.jsx               # Time slot in table view
│   └── DaySelector.jsx            # Checkbox group for days
└── hooks/
    └── useSchedule.js             # Custom hook for schedule CRUD
```

### Custom Hook Example

```javascript
// hooks/useSchedule.js
import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export function useSchedule(userId) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const q = query(collection(db, `schedules/${userId}/subjects`));
      const snapshot = await getDocs(q);
      setSubjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchSchedule();
  }, [userId]);

  const addSubject = async (subjectData) => {
    const docRef = await addDoc(collection(db, `schedules/${userId}/subjects`), subjectData);
    setSubjects([...subjects, { id: docRef.id, ...subjectData }]);
  };

  const updateSubject = async (subjectId, updates) => {
    await updateDoc(doc(db, `schedules/${userId}/subjects`, subjectId), updates);
    setSubjects(subjects.map(s => s.id === subjectId ? { ...s, ...updates } : s));
  };

  const deleteSubject = async (subjectId) => {
    await deleteDoc(doc(db, `schedules/${userId}/subjects`, subjectId));
    setSubjects(subjects.filter(s => s.id !== subjectId));
  };

  return { subjects, loading, addSubject, updateSubject, deleteSubject };
}
```

### Schedule Validation

```javascript
function validateSchedule(newSchedule, existingSchedules) {
  for (const schedule of newSchedule.schedules) {
    for (const existing of existingSchedules) {
      for (const existingSlot of existing.schedules) {
        if (schedule.dayOfWeek === existingSlot.dayOfWeek) {
          // Check time overlap
          if (timeOverlap(schedule, existingSlot)) {
            return {
              valid: false,
              message: `Conflict with ${existing.subjectName} on ${getDayName(schedule.dayOfWeek)}`
            };
          }
        }
      }
    }
  }
  return { valid: true };
}

function timeOverlap(slot1, slot2) {
  const start1 = timeToMinutes(slot1.startTime);
  const end1 = timeToMinutes(slot1.endTime);
  const start2 = timeToMinutes(slot2.startTime);
  const end2 = timeToMinutes(slot2.endTime);

  return start1 < end2 && end1 > start2;
}
```

### UI Considerations
- Use HTML `<input type="time">` for time selection
- Checkboxes for day selection (M, T, W, Th, F, S, Su)
- Color picker for subject color coding
- Toggle between Table View and Card View
- Export to PDF or image functionality

## Dependencies Management

Dependencies are managed via npm and defined in `package.json`.

**Current Core Dependencies:**
- `react`: ^19.2.0 - UI library
- `react-dom`: ^19.2.0 - React DOM renderer
- `firebase`: ^12.6.0 - Backend/database services
- `tailwindcss`: ^4.1.17 - Utility-first CSS framework
- `@tailwindcss/vite`: ^4.1.17 - Tailwind for Vite
- `gsap`: ^3.13.0 - Animation library
- `motion`: ^12.23.24 - Framer Motion for animations
- `three`: ^0.181.1 - 3D graphics library
- `lucide-react`: ^0.554.0 - Icon library

**Dev Dependencies:**
- `vite`: ^7.2.2 - Build tool
- `@vitejs/plugin-react`: ^5.1.0 - React plugin for Vite
- `eslint`: ^9.39.1 - Code linter
- TypeScript types for React

**Adding New Dependencies:**
```bash
# Production dependency
npm install package-name

# Dev dependency
npm install -D package-name
```

**Future Dependencies to Consider:**
- `react-router-dom` - Client-side routing
- `react-hook-form` - Form management
- `react-pdf` - PDF viewer for documents
- `date-fns` or `dayjs` - Date manipulation for scheduling
- `zustand` or `redux` - State management (if needed)
- `react-hot-toast` - Toast notifications

## Important Notes

- **Web Application** - Responsive design for desktop, tablet, and mobile
- Firebase for backend services (optional authentication)
- User data stored in Firestore (schedules, preferences)
- Static content bundled with the app
- PWA-ready (can be converted to Progressive Web App)
- Modern ES6+ JavaScript/JSX
- Vite for fast development and optimized production builds

## Current Development Status

**Completed:**
- Landing page with animated hero section
- Feature cards showcase
- Responsive navigation with mobile menu
- Firebase integration setup
- Basic UI foundations with Tailwind CSS

**In Progress/TODO:**
- Subject scheduling system (Table & Card views)
- Grade calculator feature
- Academic resources pages
- Campus information hub
- Downloadable forms center
- Student services section
- Firebase authentication (optional)
- Complete Firebase configuration

## File Locations Reference

**Source Code:** `src/`
**Components:** `src/components/` (reusable components)
**Pages:** `src/pages/` (page components)
**Firebase:** `src/firebase/firebase.js`
**Styles:** `src/App.css`, `src/index.css`
**Public Assets:** `public/` (static files)
**APK Downloads:** `public/bulsuEHandBook.apk`
**Configuration:** Root directory (`vite.config.js`, `package.json`, etc.)

## Vite Configuration

The project uses Vite for development and building:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173 // default dev server port
  },
  build: {
    outDir: 'dist',
    sourcemap: true // for debugging
  }
})
```

## Deployment

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Deployment Options:**
- **Firebase Hosting** (recommended for Firebase projects)
- **Vercel** (easy deployment with Git integration)
- **Netlify** (drag-and-drop or Git deployment)
- **GitHub Pages** (free static hosting)
- Any static file hosting service
