# Biz Expert's Junction UI

Act as a Principal Frontend Engineer and Lead UI/UX Designer. Build a fully responsive, highly interactive, modern web application for "Biz Expert's Junction" based on the provided company profile details below.

### 1. Branding & Visual Identity

- Company Name: Biz Expert's Junction
- Tagline: "Providing Tailored Manpower Solutions Across India" | "Beyond recruitment — crafting teams that drive results!"
- Logo & Palette: Replicate the logo structure (Dark Navy/Indigo `#1F2440` and Dynamic Orange `#F15A24` accents). Use a clean background with subtle gradients reflecting the corporate PDF colors.
- Typography: Modern sans-serif (e.g., Inter or Plus Jakarta Sans). Bold headings with elegant micro-interactions.

### 2. Design System & Animations

- Scroll Animations: Implement smooth reveal transitions (using Framer Motion, GSAP, or CSS AOS) as sections enter the viewport.
- Mouse & Hover Effects:
  - Interactive magnetic buttons on primary CTAs.
  - Hover tilt/card elevation on service cards and client logo grids.
  - Custom subtle cursor effect or ripple on button clicks.
- Page State & Reload:
  - Custom page loader/preloader featuring an animated logo pulse or progress bar.
  - Smooth page state reload with state persistence for active navigation tabs or form inputs.
- Mobile Responsiveness: Mobile-first responsive navigation bar with a glassmorphism drawer, touch-friendly swipe carousels for client logos, and dynamic grid layouts for desktop.

### 3. Website Structure & Page Content

#### Header / Navbar

- Animated sticky navigation bar with a logo component on the left.
- Nav Links: Home, About, Mission & Vision, Services, Why Choose Us, Process, Industries, Clients, Contact.
- CTA Button: "Get Talent Now" (Triggers smooth scroll to Contact Section).

#### Section 1: Hero Section

- Heading: "Tailored Manpower Solutions Across India"
- Subheading: "10+ years of experience connecting businesses with top-tier talent from startups to large enterprises."
- Interactive Counter: 10+ Years Experience, 100+ Corporate Clients, 9-Step Process Excellence.
- CTAs: "Hire Talent" and "Explore Services".

#### Section 2: About Company

- Copy: "Biz Expert's Junction is a leading recruitment consultancy firm based in Gujarat, India. Specializing in permanent hiring, bulk recruitment, and contractual staffing nationwide."
- Interactive Cards highlighting core values: Innovation, Integrity, and Strategic Growth.

#### Section 3: Mission & Vision

- Side-by-side interactive flip cards or glassmorphism banners:
  - Mission: Connect businesses with top-tier talent, understanding unique needs to fuel growth and success.
  - Vision: Become the leading global recruitment partner recognized for innovation and transforming talent acquisition into a strategic advantage.

#### Section 4: Offered Services (Grid Layout with Hover Animations)

Create interactive cards for each service:

1. Permanent Hiring
2. Bulk Hiring & Mass Recruitment
3. Contractual & Temporary Staffing
4. Executive Search & Headhunting
5. Payroll & Compliance Solutions
6. SAP Permanent/Contract Hiring (All Modules: MM, SD, FICO, ABAP, HANA, etc.)

#### Section 5: Why Choose Us (Feature Highlights)

- 10+ years of expertise in recruitment & staffing solutions.
- Extensive database of skilled professionals across industries.
- AI-powered and data-driven hiring strategies.
- Industry-specific hiring solutions tailored to client needs.
- Compliance & confidentiality assurance.
- End-to-end recruitment process support.

#### Section 6: Our 5-Step Process (Interactive Stepper / Timeline)

1. Understanding Client Requirements (Business & workforce analysis)
2. Sourcing & Screening (Multi-channel talent sourcing)
3. Interviews & Assessments (Best-fit evaluation)
4. Selection & Onboarding (Seamless hiring & induction support)
5. Post-Hiring Support (Continued transition assistance)

#### Section 7: Industries We Serve (Badge/Pill Grid with Hover Icons)

- IT & Software Development, Banking & Finance, Healthcare & Pharmaceuticals, Manufacturing & Engineering, Retail & E-Commerce, FMCG & Consumer Goods, BPO & KPO, Hospitality & Tourism, Education & EdTech, Logistics & Supply Chain.

#### Section 8: Clients We Served (Infinite Moving Logo Marquee)

- Display interactive client cards/logos for brands mentioned: P&G, Tech Mahindra, Flipkart, Meesho, XpressBees, ElasticRun, Yazaki, Motherson, Shadowfax, etc.

#### Section 9: Contact Us & Footer

- Interactive Contact Form: Name, Company Name, Email, Phone Number, Service Needed, Message field with interactive form validation.
- Contact Details:
  - Email: hr@bizexpertsjunction.com | business@bizexpertsjunction.com
  - Phone: +91 9898366447
  - Website: www.bizexpertsjunction.com
  - Social Handle: @bizexpertsjunction
- Footer: Copyright, Quick Links, Terms & Conditions link.

### 4. Technical Requirements

- Stack: React / Next.js (Tailwind CSS + Framer Motion) or HTML5/SCSS + JavaScript (GSAP/AOS).
- Clean, semantic HTML structure with ARIA accessibility tags.
- Optimized performance with fast asset loading.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/24dde508-6eb9-4b39-8933-ddfbef2ba1b6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
