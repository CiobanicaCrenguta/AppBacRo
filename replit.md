# Overview

This is a **Literary Commentary Practice Platform** - an educational web application designed for Romanian high school students preparing for the Bacalaureat exam. The platform provides progressive drill exercises for practicing literary commentaries on poetry and prose works. Students work through 5 levels of increasing difficulty: multiple choice recognition, fragment ordering, cloze completion, word bank construction, and free-write production. The application includes a commentary editor for teachers/administrators to create and manage content.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript in strict mode
- Vite as the build tool and dev server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query for data fetching and state management

**UI Component System:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library (New York style variant)
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variants

**Design Philosophy:**
- Material Design principles adapted for educational use
- Clarity-first approach with immediate visual feedback
- Progressive disclosure - complexity increases with drill levels
- Light/dark theme support with system preference detection
- Responsive design with mobile-first considerations

**State Management:**
- Theme context for light/dark mode persistence
- LocalStorage for all data persistence (commentaries and student progress)
- No backend database dependency - fully client-side data storage
- Custom storage service abstraction layer for CRUD operations

## Backend Architecture

**Server Setup:**
- Express.js server with TypeScript
- Vite middleware integration for HMR in development
- Minimal API surface - primarily serves static assets
- Session management infrastructure present but unused (connect-pg-simple)

**Data Layer:**
- In-memory storage implementation (MemStorage class)
- IStorage interface defines contract for future database integration
- Drizzle ORM configured for PostgreSQL but not actively used
- Schema definitions in Zod for runtime validation

**Key Architectural Decision:**
The application currently uses localStorage for all data persistence instead of a backend database. This choice enables:
- Zero backend complexity for MVP deployment
- Instant data access without network latency
- Easy local development without database setup
- Future migration path to PostgreSQL via existing Drizzle configuration

**Trade-offs:**
- Data is per-device, not synchronized across devices
- No multi-user authentication or authorization
- Limited to browser storage quotas (~5-10MB)
- Loss of data on browser cache clear

## Data Schema Design

**Commentary Structure (Zod validated):**
- Basic metadata: id, title, author, type (poetry/prose)
- Content sections: context, two key traits, techniques, closing
- Type-specific fields: prosody for poetry, character analysis for prose

**Drill Type Hierarchy:**
1. **Level 1 - Multiple Choice:** Question text, options array, correct index
2. **Level 2 - Ordering:** Fragment array with correct order indices
3. **Level 3 - Cloze:** Text with blanks, correct answers array
4. **Level 4 - Word Bank:** Word pool, target sentence, instructions
5. **Level 5 - Free Write:** Instructions, reference answer for comparison

**Progress Tracking:**
- Commentary ID reference
- Current level and question index
- Score and streak counters
- Completion status per level

## External Dependencies

**UI & Interaction:**
- `@radix-ui/*` - 20+ packages for accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- `wouter` - Lightweight routing (1KB alternative to React Router)
- `@tanstack/react-query` - Server state management and caching
- `embla-carousel-react` - Touch-friendly carousel component
- `cmdk` - Command menu/palette component

**Form Management:**
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod schema integration for validation

**Styling:**
- `tailwindcss` - Utility-first CSS framework
- `tailwind-merge` + `clsx` - Class name merging utilities
- `class-variance-authority` - Type-safe variant composition

**Database (Configured but Inactive):**
- `drizzle-orm` - TypeScript ORM for SQL databases
- `drizzle-zod` - Zod schema generation from Drizzle schemas
- `@neondatabase/serverless` - PostgreSQL serverless driver
- `connect-pg-simple` - PostgreSQL session store for Express

**Validation & Utilities:**
- `zod` - Runtime type validation and schema definition
- `date-fns` - Date manipulation and formatting
- `nanoid` - Unique ID generation

**Development Tools:**
- `@replit/vite-plugin-*` - Replit-specific dev tooling (error overlay, cartographer, dev banner)
- `tsx` - TypeScript execution for Node.js
- `esbuild` - Fast JavaScript bundler for production builds

**Build Configuration:**
- Development: `tsx` runs TypeScript server directly with Vite middleware
- Production: Vite bundles client, esbuild bundles server to `dist/`
- Database migrations: Drizzle Kit configured but migrations directory unused