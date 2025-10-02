# Design Guidelines: Literary Commentary Practice Platform

## Design Approach: Design System (Material Design + Educational Best Practices)

**Rationale**: Educational utility tool requiring clarity, accessibility, and intuitive workflows for both teachers and students. Material Design provides excellent structure for information-dense interfaces with clear visual feedback systems.

## Core Design Principles
1. **Clarity First**: Every element serves learning - no decorative distractions
2. **Feedback Prominence**: Visual responses to user actions must be immediate and unmistakable
3. **Hierarchy Through Structure**: Typography and spacing create clear content relationships
4. **Progressive Disclosure**: Show complexity gradually as students advance through drill levels

---

## Color Palette

### Light Mode
- **Primary**: 213 94% 48% (Deep blue - trust, learning, focus)
- **Success**: 142 76% 36% (Forest green - correct answers)
- **Error**: 0 84% 60% (Vibrant red - incorrect answers)
- **Warning**: 38 92% 50% (Amber - hints, caution)
- **Background**: 0 0% 98% (Off-white for reduced eye strain)
- **Surface**: 0 0% 100% (White cards/panels)
- **Text Primary**: 220 13% 18% (Nearly black)
- **Text Secondary**: 220 9% 46% (Medium gray)
- **Border**: 220 13% 91% (Light gray dividers)
- **Progress Bar**: 213 94% 48% (matches primary)
- **Streak Highlight**: 38 92% 50% (amber for achievement badges)

### Dark Mode
- **Primary**: 213 94% 60% (Lighter blue)
- **Success**: 142 76% 45%
- **Error**: 0 84% 68%
- **Warning**: 38 92% 60%
- **Background**: 220 13% 12%
- **Surface**: 220 13% 16%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 220 9% 70%
- **Border**: 220 13% 25%

---

## Typography

**Font Stack**: System UI fonts for optimal performance
```
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
Code/Monospace: 'SF Mono', Monaco, 'Cascadia Code', monospace
```

**Scale**:
- Headings: text-3xl (commentary titles), text-2xl (section headers), text-xl (drill titles)
- Body: text-base (commentary text, questions)
- Small: text-sm (helper text, labels)
- Metadata: text-xs (timestamps, counters)

**Weights**: 
- Headings: font-semibold (600)
- Body: font-normal (400)
- Emphasis: font-medium (500)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4, p-6, p-8
- Vertical spacing between sections: space-y-6, space-y-8
- Card spacing: gap-6 in grids
- Form element spacing: space-y-4

**Container Strategy**:
- Max width: max-w-6xl for main content areas
- Max width: max-w-4xl for reading-heavy commentary text
- Full width: w-full with inner padding for header/footer

**Grid Patterns**:
- Commentary list: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Drill options (multiple choice): grid-cols-1 gap-3
- Teacher editing panels: grid-cols-1 lg:grid-cols-2 (form left, preview right)

---

## Component Library

### Navigation Header
- Fixed top bar with app title "Comentarii Literare - Exerciții Bac"
- Teacher mode toggle switch (only when needed)
- Progress indicators for active drill session
- Dark mode toggle
- Height: h-16, shadow-md

### Commentary Cards (Index View)
- White/surface background with shadow-sm hover:shadow-md transition
- Rounded corners: rounded-lg
- Structure: Title (text-xl), Author (text-sm text-secondary), Type badge (poezie/proză), Preview snippet
- Icon: book icon for poetry, document icon for prose
- Padding: p-6

### Drill Interface
- **Question Panel**: Large text (text-lg), clear numbering (1/10), ample whitespace (space-y-6)
- **Answer Options**: 
  - Multiple choice: Large click targets (min-h-14), hover:bg-primary/5
  - Ordering: Draggable cards with grip handles, visual feedback during drag
  - Fill-in-blanks: Inline input fields (underlined, min-w-32)
  - Word bank: Draggable pills (rounded-full px-4 py-2)
  - Free write: Textarea (min-h-48, rounded-lg, p-4)

### Progress Components
- **Progress Bar**: Full-width, height h-2, rounded-full, smooth transition, shows percentage completion
- **Streak Counter**: Flame icon 🔥 + number, positioned top-right, animated on increment
- **Score Display**: Large numbers (text-4xl font-bold), centered, color-coded (green for >80%, amber 50-80%, gray <50%)

### Feedback System
- **Correct Answer**: Green background (bg-success/10), green border (border-success), checkmark icon, 300ms transition
- **Incorrect Answer**: Red background (bg-error/10), red border (border-error), X icon, shake animation
- **Hint Box**: Amber border-l-4, light amber background, lightbulb icon

### Teacher Editor Interface
- **Split View**: Left panel (form inputs), right panel (live preview)
- **Form Structure**: Labeled sections with clear headings, text-sm labels above inputs
- **Input Types**: 
  - Commentary sections: Textarea (min-h-32)
  - Drill questions: Dynamic add/remove with + button
  - Answer options: Input groups with radio/checkbox for correct answer marking
- **Action Buttons**: Primary button (Save), secondary (Preview), ghost (Cancel)

### Buttons
- **Primary**: bg-primary text-white, rounded-md px-6 py-3, hover:bg-primary/90
- **Secondary**: border border-primary text-primary, hover:bg-primary/5
- **Ghost**: text-primary hover:bg-primary/5
- **Icon Buttons**: p-2 rounded-md hover:bg-primary/5

---

## Images

**Hero Section**: No large hero image - this is a utility application. Instead, use a simple header with title and illustration icon (open book SVG, 64x64px).

**In-Content Imagery**:
- Small decorative icons for commentary types (book, scroll) - 24x24px
- Achievement badges for streak milestones (simple SVG icons)
- Author portraits if available (rounded-full, w-12 h-12, grayscale filter)

---

## Interaction Patterns

### Transitions
- Standard duration: 200ms (hover states, button clicks)
- Feedback animations: 300ms (answer validation)
- Page transitions: 150ms (navigation between views)

### States
- **Hover**: Subtle background changes (opacity-based), no movement
- **Active/Focus**: Border color change + shadow increase
- **Disabled**: opacity-50 cursor-not-allowed
- **Loading**: Spinner with primary color, centered

### Drag & Drop (Ordering Exercises)
- Cursor: cursor-grab when idle, cursor-grabbing when dragging
- Visual lift: shadow-lg + slight scale (scale-105) during drag
- Drop zones: border-dashed border-2 border-primary/30

---

## Accessibility
- Maintain 4.5:1 contrast ratio minimum for all text
- Focus indicators: 2px solid ring in primary color
- Keyboard navigation: Tab through all interactive elements
- Screen reader labels for all icons and interactive elements
- Form inputs must have associated labels
- Error messages announced to screen readers

---

## Responsive Breakpoints
- Mobile: Full-width cards, stacked layout, simplified navigation
- Tablet (md): 2-column grids, visible sidebar for teacher mode
- Desktop (lg): 3-column commentary grid, split-view editor, persistent progress sidebar