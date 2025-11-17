# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BulSU E-Handbook** is a native Android mobile application for Bulacan State University's Bustos Campus. The app serves as a comprehensive campus companion providing students with access to university resources and information.

**Technology Stack:**
- **Language:** Java
- **Framework:** Native Android (AndroidX)
- **UI:** Material Design 3 (Material You)
- **Build System:** Gradle with Kotlin DSL
- **Min/Target SDK:** API 24 (Android 7.0) / API 36 (Android 15)
- **Layout System:** ConstraintLayout

## Build and Development Commands

### Building the Application
```bash
# Build debug APK
gradlew assembleDebug

# Build release APK
gradlew assembleRelease

# Build all variants
gradlew build

# Clean build artifacts
gradlew clean
```

### Running Tests
```bash
# Run unit tests
gradlew test

# Run instrumented tests (requires emulator or device)
gradlew connectedAndroidTest

# Run specific test class
gradlew test --tests "com.example.bulsuehandbook.ExampleUnitTest"
```

### Development
```bash
# Install debug build to connected device/emulator
gradlew installDebug

# Uninstall from device
gradlew uninstallDebug

# View dependencies
gradlew dependencies

# Check for dependency updates
gradlew dependencyUpdates
```

### Linting and Code Quality
```bash
# Run Android lint checks
gradlew lint

# Generate lint report
gradlew lintDebug
```

## Application Architecture

### Current Structure
The app currently uses a simple **Activity-based architecture** suitable for the early development stage:

```
MainActivity (Splash/Opening Screen)
    ↓
HomePageActivity (Main Dashboard)
    ├── Student Handbook
    ├── Campus Map
    ├── Academic Calendar
    └── Contact Directory
```

### Key Activities

1. **MainActivity** (`MainActivity.java`)
   - Entry point (LAUNCHER activity)
   - Splash screen with animated logo
   - Animations: logo scale (2.5x → 1.0x), fade-in text, slide-up button
   - Transitions to HomePageActivity

2. **HomePageActivity** (`HomePageActivity.java`)
   - Main dashboard with 4 feature cards
   - Back navigation to MainActivity
   - Contains placeholder TODOs for feature implementations

### Resource Organization

**Layouts:** `app/src/main/res/layout/`
- `activity_main.xml` - Splash screen
- `activity_home_page.xml` - Main dashboard

**Animations:** `app/src/main/res/anim/`
- `fade_in.xml` - 1000ms fade, 800ms offset
- `logo_scale_animation.xml` - Scale animation for splash
- `slide_up.xml` - Button entrance animation

**Drawables:** `app/src/main/res/drawable/`
- Vector graphics for UI decorations
- Gradient backgrounds for buttons
- University branding assets

**Responsive Dimensions:** `app/src/main/res/values-{small,large}/dimens.xml`
- Device-specific dimension resources for different screen sizes

## Feature Set

### Implemented Features

**Opening Screen:**
- Animated splash screen with university branding
- Smooth transitions to main dashboard

**Home Dashboard:**
- Scrollable card-based interface
- Material Design 3 styling
- Green university color scheme (#1B5E20, #2E7D32)

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

Currently no data layer exists. For implementation:

**For Static Content (Handbook, Regulations, etc.):**
- Store in `assets/` folder as JSON or text files
- Consider bundling PDFs for downloadable content

**For Dynamic User Data (Schedules, Notes, etc.):**
- Implement Room Database
- Create entities for: Subject, Schedule, UserPreferences
- Use ViewModel + LiveData for reactive UI updates

**For Forms and Documents:**
- Store URLs to remote documents
- Implement download manager for offline access
- Cache downloaded files in app-specific storage

## Code Patterns and Conventions

### Package Structure
```
com.example.bulsuehandbook/
├── activities/          (Activity classes)
├── adapters/            (RecyclerView adapters - to be added)
├── models/              (Data models - to be added)
├── utils/               (Utility classes - to be added)
└── viewmodels/          (ViewModels - to be added)
```

### Activity Lifecycle
- Use `onCreate()` for initialization
- Apply EdgeToEdge with system inset handling for modern Android UI
- Enable back navigation via manifest parent activity
- **ALWAYS set `android:screenOrientation="portrait"` for ALL activities** - This app is designed for portrait mode only

### Creating New Activities

When creating a new activity, ALWAYS follow these steps:

1. **Create the Java class** in `app/src/main/java/com/example/bulsuehandbook/`
2. **Create the layout XML** in `app/src/main/res/layout/`
3. **Register in AndroidManifest.xml** with the following template:

```xml
<activity
    android:name=".YourActivityName"
    android:exported="false"
    android:screenOrientation="portrait"
    android:parentActivityName=".ParentActivity" />
```

**CRITICAL:** Never forget `android:screenOrientation="portrait"` - this app is portrait-only.

### Theme and Styling
- Primary Theme: `Theme.Material3.DayNight.NoActionBar`
- Support dark mode via `values-night/` resources
- Use Material Design 3 components (MaterialCardView, MaterialButton, etc.)

## Design System & Theme

### Tech-Themed Visual Identity

The app features a **modern technological design** with circuit board patterns and digital elements, perfect for IT students while maintaining BulSU brand colors.

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

#### 1. Tech Banners (Top & Bottom)
**Location:** `app/src/main/res/drawable/`
- `tech_top_banner.xml` - Top banner with dark green gradient
- `tech_bottom_banner.xml` - Bottom banner with mirrored gradient

**Features:**
- Dark green gradient background (#1B5E20 → #2E7D32 → #388E3C)
- Horizontal dashed circuit traces (white, semi-transparent)
- Diagonal circuit lines at angles (+30°, -25°, ±30°)
- Angular geometric cuts connecting to body
- Dark overlay for depth

**Usage:** Use for headers, section dividers, or app bars

#### 2. Circuit Board Pattern
**Location:** `app/src/main/res/drawable/circuit_pattern.xml`

**Elements:**
- Large circuit nodes (12-14dp ovals) with white borders
- Color: #66BB6A, #81C784, #4CAF50
- Microchip squares (22-35dp) rotated at various angles
- Circuit connection lines (2dp white rectangles)
- Semi-transparent overlays (CC/AA alpha)

**Usage:** Overlay on banners or backgrounds for tech aesthetic

#### 3. Tech Background
**Location:** `app/src/main/res/drawable/tech_background.xml`

**Elements:**
- Light base background (#FAFAFA)
- Digital grid dots (4dp ovals) in green shades
- Tech hexagon rings (35-50dp) with 2dp stroke
- Binary/Digital bars (5dp width, varying heights) - equalizer style
- CPU/Chip rectangles (25-30dp) with rounded corners
- Scattered placement for subtle tech aesthetic

**Usage:** Body background, content areas

#### 4. Button Styles

**Primary Button** (`button_tech_gradient.xml`):
- Dark green gradient (#2E7D32 → #388E3C → #43A047)
- 30dp corner radius
- White text
- Use for primary actions (Get Started, Submit, Save)

**Secondary Button** (`button_tech_secondary.xml`):
- White background
- 2dp dark green border (#2E7D32)
- Dark green text (#2E7D32)
- 30dp corner radius
- Use for secondary actions (My Schedule, Cancel)

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

### Card Design Guidelines

**CRITICAL: Always set explicit background colors for MaterialCardView components**

When creating MaterialCardView components, ALWAYS explicitly set the background color to prevent dark mode or theme issues:

```xml
<com.google.android.material.card.MaterialCardView
    android:id="@+id/cardExample"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardBackgroundColor="#FFFFFF"  <!-- REQUIRED: Always set this -->
    app:cardCornerRadius="16dp"
    app:cardElevation="6dp"
    app:strokeWidth="0dp">
    <!-- Card content -->
</com.google.android.material.card.MaterialCardView>
```

**Standard Card Configuration:**
- Background: `app:cardBackgroundColor="#FFFFFF"` (white)
- Corner Radius: `app:cardCornerRadius="16dp"`
- Elevation: `app:cardElevation="6dp"`
- Stroke Width: `app:strokeWidth="0dp"` (no border)
- Bottom Margin: `android:layout_marginBottom="16dp"` (spacing between cards)

**Card Header Pattern with Icons:**

Use ImageView icons instead of text emojis for better consistency across devices:

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:gravity="center_vertical"
    android:padding="12dp"
    android:background="@drawable/provision_card_header_bg"
    android:layout_marginBottom="12dp">

    <!-- Leading Icon -->
    <ImageView
        android:layout_width="24dp"
        android:layout_height="24dp"
        android:src="@drawable/ic_nav_policies"
        android:contentDescription="Section Icon"
        android:layout_marginEnd="12dp"
        app:tint="#FFFFFF" />

    <!-- Title Text -->
    <TextView
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="Card Title"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        android:textStyle="bold" />

    <!-- Trailing Icon (expand/navigate) -->
    <ImageView
        android:layout_width="24dp"
        android:layout_height="24dp"
        android:src="@drawable/ic_expand_more"
        android:contentDescription="View Details"
        app:tint="#FFFFFF" />
</LinearLayout>
```

**Icon Usage Guidelines:**
- **DO NOT use emojis** (📚, 🎓, 📖, 📄, etc.) in production layouts
- **DO use vector drawable icons** from `res/drawable/ic_*.xml`
- Icons should be 24dp x 24dp for card headers
- Always set `contentDescription` for accessibility
- Use `app:tint="#FFFFFF"` for icon color on colored backgrounds

**Available Icons:**
- `ic_nav_home` - Home/Dashboard
- `ic_nav_department` - Department/Admin
- `ic_nav_policies` - Policies/Regulations
- `ic_nav_services` - Services/Forms
- `ic_nav_academic` - Academic/Curriculum
- `ic_nav_others` - Other/Miscellaneous
- `ic_expand_more` - Expand/Navigate (trailing icon)
- `ic_back_arrow` - Back navigation
- `ic_scroll_to_top` - Scroll to top FAB

### Design Patterns

#### Opening/Splash Screen Pattern
```xml
<!-- Structure -->
<ConstraintLayout background="@drawable/tech_background">
    <View id="topDecoration" background="@drawable/tech_top_banner" height="280dp"/>
    <View id="circuitPattern" background="@drawable/circuit_pattern" alpha="0.6"/>
    <CardView id="logoCard" elevation="12dp" cornerRadius="@dimen/logo_corner_radius">
        <ImageView logo />
    </CardView>
    <TextView universityName color="#1B5E20"/>
    <TextView campusName color="#2E7D32"/>
    <TextView tagline color="#424242"/>
    <Button primary background="@drawable/button_tech_gradient"/>
    <Button secondary background="@drawable/button_tech_secondary"/>
    <View id="bottomDecoration" background="@drawable/tech_bottom_banner" height="200dp"/>
    <View id="circuitPatternBottom" alpha="0.5" rotation="180"/>
</ConstraintLayout>
```

#### Angular Design System
- Use angular cuts (2-3° rotation) instead of wavy curves
- Connect top and bottom sections with matching angles
- Creates modern, tech-forward aesthetic

#### Layering System
1. **Base Layer:** tech_background.xml
2. **Banner Layer:** tech_top_banner.xml / tech_bottom_banner.xml
3. **Pattern Overlay:** circuit_pattern.xml (0.5-0.6 alpha)
4. **Content Layer:** UI elements (logo, text, buttons)

### Animations

**Opening Screen Animations:**
- Logo scale: 2.5x → 1.0x
- Text fade-in: 1000ms duration, 800ms offset
- Button slide-up: From bottom

**Transition Guidelines:**
- Use MaterialContainerTransform for screen transitions
- 300-400ms duration for most transitions
- Ease-in-out interpolator

### Accessibility

- Minimum touch target: 48x48dp
- Text contrast ratios meet WCAG AA standards
- Dark green (#1B5E20) on white: 9.8:1 ✓
- Medium green (#2E7D32) on white: 7.4:1 ✓
- Support for TalkBack and other assistive technologies

### Responsive Design

**Dimension Resources:**
- Small devices: `values-small/dimens.xml`
- Normal devices: `values/dimens.xml`
- Large devices: `values-large/dimens.xml`

**Scaling Guidelines:**
- Use sp for text sizes
- Use dp for all other dimensions
- Test on multiple screen sizes (phone, tablet)

### Dark Mode Support (Future)

When implementing dark mode:
- Background: `#121212` (Material dark surface)
- Replace light backgrounds with dark equivalents
- Maintain green color palette with adjusted saturation
- Increase circuit pattern alpha for visibility
- Use `values-night/` resource directory

## Subject Scheduling Implementation Guide

When implementing the subject scheduling feature:

### Database Schema (Room)
```java
@Entity(tableName = "subjects")
class Subject {
    @PrimaryKey(autoGenerate = true)
    int id;
    String subjectName;
    String subjectCode;
    String instructor;
    String room;
}

@Entity(tableName = "schedules")
class Schedule {
    @PrimaryKey(autoGenerate = true)
    int id;
    int subjectId;  // Foreign key to Subject
    int dayOfWeek;  // 1=Monday, 2=Tuesday, etc.
    String startTime;  // "08:00"
    String endTime;    // "09:30"
}
```

### UI Components
- Use RecyclerView for schedule list/grid
- TimePicker dialogs for time selection
- CheckBoxes or ToggleButtons for day selection
- Floating Action Button (FAB) for adding new subjects

### Schedule Validation
- Check for time conflicts (same day, overlapping times)
- Validate end time is after start time
- Warn user of back-to-back classes

### Weekly View Options
- GridLayout for calendar-style view
- RecyclerView with day headers for list view
- Consider third-party libraries like MaterialCalendarView

## Dependencies Management

Dependencies are managed via Gradle version catalog (`gradle/libs.versions.toml`).

**Current Core Dependencies:**
- androidx.appcompat:1.7.1
- material:1.13.0
- androidx.activity:1.11.0
- constraintlayout:2.2.1

**Future Dependencies to Consider:**
- Room Database: `androidx.room:room-runtime`
- Navigation Component: `androidx.navigation:navigation-fragment`
- ViewModels/LiveData: `androidx.lifecycle:lifecycle-viewmodel`
- RecyclerView: `androidx.recyclerview:recyclerview`
- PDF Viewer: `com.github.barteksc:android-pdf-viewer`

## Important Notes

- **This is a STATIC APP** - No user authentication or profile management
- No user login/registration system required
- All content is read-only and publicly accessible
- The app uses Java 11 compatibility
- No ProGuard/R8 minification in release builds currently
- AndroidX migration complete
- Supports RTL layouts
- Material Design 3 with day/night theme support
- Edge-to-edge display with proper inset handling
- **PORTRAIT MODE ONLY** - All activities must have `android:screenOrientation="portrait"` in AndroidManifest.xml

## Current Development Status

**Completed:**
- Opening/splash screen with animations
- Basic home dashboard structure
- UI foundations with Material Design 3

**In Progress/TODO:**
- Feature screens implementation (4 main cards are placeholders)
- Subject scheduling system
- Data persistence layer
- Navigation framework
- Form download functionality
- Content population for university information

## File Locations Reference

**Java Source:** `app/src/main/java/com/example/bulsuehandbook/`
**Layouts:** `app/src/main/res/layout/`
**Resources:** `app/src/main/res/values/`
**Animations:** `app/src/main/res/anim/`
**Assets:** `app/src/main/assets/` (to be created for static content)
**Tests:** `app/src/test/` (unit) and `app/src/androidTest/` (instrumented)

## Gradle Configuration

Build files use Kotlin DSL (.kts):
- **Root:** `build.gradle.kts` (minimal, just plugin declaration)
- **App Module:** `app/build.gradle.kts` (main build configuration)
- **Version Catalog:** `gradle/libs.versions.toml` (dependency versions)

When adding dependencies, update the version catalog first, then reference in `app/build.gradle.kts` using `libs.libraryName` syntax.
