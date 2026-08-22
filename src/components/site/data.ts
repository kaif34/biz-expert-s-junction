import {
  BadgeCheck,
  Banknote,
  Boxes,
  Briefcase,
  Building2,
  Cpu,
  Database,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Layers,
  LineChart,
  Lock,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  Users2,
  Wrench,
} from "lucide-react";

export const NAV_ITEMS = [
  { path: "/", label: "Home" },
  {
    label: "About",
    path: "/about",
    dropdown: [
      { label: "About Us", path: "/about#about", desc: "Overview & key company pillars" },
      { label: "Mission & Vision", path: "/about#mission", desc: "Our core values & strategy" },
      { label: "Why Choose Us", path: "/about#why-us", desc: "10+ years of recruitment expertise" },
    ],
  },
  {
    label: "Services",
    path: "/services",
    isServicesDropdown: true,
  },
  {
    label: "Explore",
    path: "/process",
    dropdown: [
      { label: "Our Process", path: "/process#process", desc: "6-step recruitment framework" },
      {
        label: "Industries We Serve",
        path: "/process#industries",
        desc: "Tech, Manufacturing, Healthcare & more",
      },
      {
        label: "Clients & Reviews",
        path: "/process#clients",
        desc: "Enterprise partners & testimonials",
      },
    ],
  },
  { path: "/careers", label: "Careers" },
  { path: "/contact", label: "Contact" },
] as const;

export const NAV_LINKS = NAV_ITEMS.map((item) => ({
  id: item.path === "/" ? "home" : item.path.replace("/", ""),
  label: item.label,
  path: item.path,
  hasDropdown: "hasDropdown" in item ? item.hasDropdown : false,
}));

export const VALUES = [
  {
    icon: Sparkles,
    title: "Innovation",
    body: "AI-assisted sourcing and data-driven shortlists that cut time-to-hire without cutting quality.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    body: "Transparent mandates, confidential handling and compliance-first documentation on every placement.",
  },
  {
    icon: LineChart,
    title: "Strategic Growth",
    body: "We map hiring to your roadmap so every role added compounds business outcomes.",
  },
];

export interface DetailedService {
  slug: string;
  title: string;
  body: string;
  badge: string;
  icon: React.ElementType;
  detailedDesc: string;
  highlights: string[];
  roles: string[];
}

export const SERVICES: DetailedService[] = [
  {
    slug: "permanent-hiring",
    title: "Permanent Hiring",
    body: "End-to-end permanent recruitment for niche and volume roles, with replacement assurance.",
    badge: "Core Solution",
    icon: UserCheck,
    detailedDesc:
      "Our Permanent Hiring solution identifies and secures high-performing talent aligned with your organization's culture, growth trajectory, and skill requirements. From entry-level specialists to mid-tier managers, we guarantee candidates who deliver long-term value.",
    highlights: [
      "Replacement guarantee period on every placement",
      "Rigorous technical and cultural pre-screening",
      "Sourced from proprietary talent pipelines & nationwide databases",
      "Streamlined candidate interview scheduling & feedback loop",
    ],
    roles: [
      "Software Engineers & Architects",
      "Sales & Marketing Executives",
      "Plant & Quality Managers",
      "Finance & HR Professionals",
    ],
  },
  {
    slug: "bulk-hiring",
    title: "Bulk Hiring & Mass Recruitment",
    body: "Drive-based hiring engines for warehouses, plants, BPOs and last-mile networks.",
    badge: "High-Volume",
    icon: Users2,
    detailedDesc:
      "When scaling up operations, opening new plants, or expanding retail and logistics networks, our Bulk Hiring engine deploys targeted recruitment drives across Tier-1, 2, and 3 locations to quickly fill hundreds of positions.",
    highlights: [
      "On-ground recruitment drive management",
      "Pre-verified candidate batches ready for fast onboarding",
      "Robust document verification & background checks",
      "Scalable model handling 50 to 1000+ hires per mandate",
    ],
    roles: [
      "Warehouse Operations Staff",
      "Plant Technicians & Operators",
      "BPO / Call Center Executives",
      "Delivery & Field Executives",
    ],
  },
  {
    slug: "contractual-staffing",
    title: "Contractual & Temporary Staffing",
    body: "Flexible headcount on our rolls — onboarding, attendance and exits fully managed.",
    badge: "Flexible Headcount",
    icon: Briefcase,
    detailedDesc:
      "Manage workforce fluctuations and seasonal peaks effortlessly. We place skilled contractors on our payroll while taking full responsibility for statutory compliance, attendance tracking, monthly payroll, and exit management.",
    highlights: [
      "Complete statutory compliance (PF, ESIC, LWF, Bonus)",
      "Zero liability on client core payroll rolls",
      "Rapid deployment & replacement within 48-72 hours",
      "Dedicated account management for contractor support",
    ],
    roles: [
      "Contract IT Consultants",
      "Project-based Operations Staff",
      "Temporary Administrative Staff",
      "Seasonal Support Workforce",
    ],
  },
  {
    slug: "executive-search",
    title: "Executive Search & Headhunting",
    body: "Discreet mapping and approach for leadership, CXO and business-critical mandates.",
    badge: "Leadership & CXO",
    icon: Search,
    detailedDesc:
      "Finding transformative leaders requires stealth, deep domain intelligence, and personal trust. Our Executive Search practice discreetly maps competitive leadership pools to approach top-tier executives who can lead your strategic initiatives.",
    highlights: [
      "Discreet candidate mapping & stealth outreach",
      "Comprehensive psychometric & leadership assessment",
      "Competitor organizational structure mapping",
      "Offer negotiation & smooth transition counseling",
    ],
    roles: [
      "Chief Executive Officer (CEO)",
      "Chief Technology / Operating Officer (CTO/COO)",
      "Vice Presidents & Functional Heads",
      "Managing Directors & Plant Heads",
    ],
  },
  {
    slug: "payroll-compliance",
    title: "Payroll & Compliance Solutions",
    body: "Payroll processing, statutory filings, PF/ESIC and audit-ready compliance records.",
    badge: "Managed Services",
    icon: FileCheck2,
    detailedDesc:
      "Ensure 100% statutory adherence and error-free payroll operations with our fully managed payroll suite. We process employee salaries, calculate tax deductions, file monthly statutory returns, and maintain audit-ready documentation.",
    highlights: [
      "Error-free salary calculations & payslip generation",
      "PF, ESIC, PT, and TDS filing and compliance reports",
      "Labour law audit readiness and registry upkeep",
      "Employee self-service query resolution desk",
    ],
    roles: [
      "End-to-End Managed Payroll Services",
      "Statutory Audit & Advisory",
      "Third-Party Payroll Operations",
      "Labour Law Compliance Management",
    ],
  },
  {
    slug: "sap-hiring",
    title: "SAP Permanent / Contract Hiring",
    body: "All modules — MM, SD, FICO, ABAP, HANA, BASIS, SuccessFactors and more.",
    badge: "Specialized Tech",
    icon: Database,
    detailedDesc:
      "SAP implementations and upgrades require niche expertise that is difficult to source. Our specialized SAP recruitment practice connects enterprise clients with certified SAP functional and technical consultants across all modules.",
    highlights: [
      "Pre-vetted functional & technical SAP consultants",
      "Coverage across S/4HANA, ECC, Cloud & SuccessFactors",
      "Flexible hiring models: Permanent, Contract, or Hybrid",
      "Niche talent pipelines for rare SAP module competencies",
    ],
    roles: [
      "SAP FICO / MM / SD Consultants",
      "SAP ABAP / HANA Developers",
      "SAP BASIS & Security Engineers",
      "SAP SuccessFactors & Ariba Specialists",
    ],
  },
];

export const WHY_US = [
  {
    icon: BadgeCheck,
    title: "10+ years of expertise",
    body: "A decade of recruitment & staffing delivery across India.",
  },
  {
    icon: Users,
    title: "Extensive talent database",
    body: "Pre-screened professionals mapped across industries and grades.",
  },
  {
    icon: Cpu,
    title: "AI-powered hiring",
    body: "Data-driven sourcing, scoring and pipeline analytics.",
  },
  {
    icon: Layers,
    title: "Industry-specific solutions",
    body: "Hiring playbooks tailored to each sector and role family.",
  },
  {
    icon: Lock,
    title: "Compliance & confidentiality",
    body: "Assured statutory compliance and airtight data handling.",
  },
  {
    icon: Boxes,
    title: "End-to-end support",
    body: "From requirement scoping to post-joining stabilisation.",
  },
];

export const PROCESS = [
  {
    title: "Understanding Client Requirements",
    body: "Business & workforce analysis — role scope, band, culture markers and success metrics.",
  },
  {
    title: "Sourcing & Screening",
    body: "Multi-channel talent sourcing across our database, referrals, networks and digital reach.",
  },
  {
    title: "Interviews & Assessments",
    body: "Structured evaluation to ensure the best fit for your organisation, technically and culturally.",
  },
  {
    title: "Selection & Onboarding",
    body: "Offer management, documentation and seamless hiring & induction support.",
  },
  {
    title: "Post-Hiring Support",
    body: "Continued assistance for a smooth transition, engagement and early-tenure retention.",
  },
];

export const INDUSTRIES = [
  {
    icon: Cpu,
    label: "IT & Software Development",
    desc: "Full-stack engineers, cloud architects, DevOps & product leaders.",
    roles: ["React/Node Developers", "DevOps Engineers", "Solution Architects"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Wrench,
    label: "Manufacturing & Industrial",
    desc: "Plant heads, QA engineers, shop-floor operators & maintenance leads.",
    roles: ["Plant Operations Manager", "Quality Assurance Engineer", "CNC Operators"],
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: HeartPulse,
    label: "Healthcare & Pharmaceuticals",
    desc: "R&D scientists, medical representatives, QA managers & clinical staff.",
    roles: ["Pharma R&D Specialist", "Regulatory Affairs Lead", "QC Analyst"],
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Truck,
    label: "Logistics & Supply Chain",
    desc: "Warehouse managers, fleet supervisors, last-mile drivers & dispatchers.",
    roles: ["Warehouse Operations Head", "Fleet Supervisor", "Supply Planner"],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Banknote,
    label: "Banking & Finance",
    desc: "Relationship managers, credit analysts, accountants & risk auditors.",
    roles: ["Credit Risk Officer", "Branch Relationship Manager", "Statutory Auditor"],
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: ShoppingCart,
    label: "Retail & E-Commerce",
    desc: "Category managers, store operations leads, customer support & fulfillment.",
    roles: ["Category Manager", "Store Operations Executive", "Fulfillment Lead"],
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Biz Expert's Junction helped us scale our warehouse operations team by 150+ staff in under 3 weeks. Their bulk recruitment drive in Gujarat was remarkably organized.",
    name: "Vikram R. Mehta",
    title: "VP of HR & Talent",
    company: "National Logistics Enterprise",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote:
      "Finding certified SAP S/4HANA consultants used to take months. Biz Expert's Junction delivered 4 niche specialists within 10 days, completely pre-screened and ready to start.",
    name: "Ananya Sharma",
    title: "Head of SAP Delivery",
    company: "Global IT Services",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote:
      "Their executive search team handled our Managing Director mandate with absolute discretion and professional finesse. They truly understand leadership alignment.",
    name: "Rajesh Patel",
    title: "Chief Executive Officer",
    company: "Precision Engineering Corp",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
];

export const CLIENTS = [
  "P&G",
  "Tech Mahindra",
  "Flipkart",
  "Meesho",
  "XpressBees",
  "ElasticRun",
  "Yazaki",
  "Motherson",
  "Shadowfax",
  "JBM Group",
  "Troikaa",
  "5paisa",
  "KD Logistics",
];

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Hybrid" | "Remote" | "Contract";
  experience: string;
  salary: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  applyUrl?: string;
  companyLogo?: string;
  customFields?: Array<{ id: string; label: string; type: string; required: boolean }>;
}

export const CAREER_JOBS: JobOpening[] = [
  {
    id: "job-1",
    title: "Senior IT Recruitment Specialist",
    department: "IT & Software",
    location: "Ahmedabad, Gujarat (Hybrid)",
    type: "Full-time",
    experience: "3 - 6 Years",
    salary: "₹6,00,000 - ₹10,00,000 P.A.",
    postedDate: "2 days ago",
    description: "Lead end-to-end recruitment drives for tier-1 tech client mandates including Full-Stack Developers, Cloud Architects, and AI Engineers.",
    responsibilities: [
      "Source and screen tech candidates via LinkedIn Recruiter, GitHub, and internal talent pools.",
      "Conduct initial technical pre-screening and candidate background evaluations.",
      "Manage key account relationships and maintain high SLA candidate turnaround times.",
      "Track and report sourcing metrics, conversion ratios, and hiring funnels."
    ],
    requirements: [
      "Proven experience in IT talent acquisition or technical recruiting agency.",
      "Strong understanding of tech stacks (React, Node.js, Python, Java, Cloud, DevOps).",
      "Excellent negotiation, candidate engagement, and communication skills."
    ],
    skills: ["IT Sourcing", "Tech Screening", "LinkedIn Recruiter", "Account Management", "Talent Acquisition"]
  },
  {
    id: "job-2",
    title: "SAP Talent Acquisition Lead",
    department: "SAP & Enterprise Solutions",
    location: "Ahmedabad / Remote",
    type: "Full-time",
    experience: "4 - 8 Years",
    salary: "₹8,00,000 - ₹14,00,000 P.A.",
    postedDate: "1 day ago",
    description: "Drive niche executive search mandates for SAP S/4HANA, FICO, MM, SD, and Basis consultants for enterprise transformation projects.",
    responsibilities: [
      "Head specialized sourcing for SAP functional & technical consultants across India.",
      "Build pipeline for contract-to-hire and permanent SAP deployment roles.",
      "Collaborate with client HR heads to align technical requirements with budget expectations."
    ],
    requirements: [
      "Minimum 4 years hands-on sourcing experience for ERP & SAP modules.",
      "Deep understanding of SAP implementation lifecycles and certifications.",
      "Strong network of SAP certified professionals across India."
    ],
    skills: ["SAP S/4HANA", "ERP Hiring", "Executive Search", "Niche Sourcing", "Client Servicing"]
  },
  {
    id: "job-3",
    title: "Bulk Sourcing & Campus Hiring Lead",
    department: "Non-IT & Operations",
    location: "Gujarat / On-site Travel",
    type: "Full-time",
    experience: "2 - 5 Years",
    salary: "₹4,50,000 - ₹7,50,000 P.A.",
    postedDate: "3 days ago",
    description: "Execute large-scale volume hiring drives for manufacturing, supply chain, and retail client plants across Western India.",
    responsibilities: [
      "Organize walk-in interview drives and campus recruitment programs in engineering & diploma colleges.",
      "Manage field recruiters and coordinate candidate onboarding logistics.",
      "Ensure compliance with client labor SLAs and documentation guidelines."
    ],
    requirements: [
      "Experience conducting high-volume or blue-collar/grey-collar recruitment drives.",
      "Strong operational leadership and multi-location field execution skills.",
      "Willingness to travel for regional recruitment camps."
    ],
    skills: ["Bulk Recruitment", "Campus Hiring", "Field Sourcing", "Vendor Management", "Onboarding"]
  },
  {
    id: "job-4",
    title: "Executive Talent Partner (Healthcare & Pharma)",
    department: "Healthcare & Life Sciences",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    experience: "3 - 7 Years",
    salary: "₹5,50,000 - ₹9,50,000 P.A.",
    postedDate: "Just now",
    description: "Manage senior and specialized hiring for Pharmaceutical R&D scientists, QC/QA leads, and medical affairs positions.",
    responsibilities: [
      "Partner with pharma & healthcare enterprises for specialized scientific placements.",
      "Screen candidates against regulatory, GMP, and R&D technical standards.",
      "Map industry talent pools across major pharma hubs in Gujarat and Maharashtra."
    ],
    requirements: [
      "Background in Life Sciences, Pharma, or Healthcare recruitment.",
      "Comprehensive knowledge of pharma industry roles and salary benchmarks.",
      "Track record of successfully placing mid-to-senior pharma professionals."
    ],
    skills: ["Pharma Recruitment", "R&D Sourcing", "Executive Search", "Headhunting", "Client Relations"]
  },
  {
    id: "job-5",
    title: "Business Development Manager (Staffing & Search)",
    department: "Sales & Business Development",
    location: "Ahmedabad, Gujarat (Hybrid)",
    type: "Full-time",
    experience: "3 - 8 Years",
    salary: "₹7,00,000 - ₹12,00,000 P.A. + Uncapped Incentives",
    postedDate: "4 days ago",
    description: "Drive business acquisition, client onboarding, and corporate partnerships for permanent staffing and executive search contracts.",
    responsibilities: [
      "Identify enterprise prospects, pitch recruitment solutions, and close MSAs.",
      "Build long-term relationships with CHROs, HR VPs, and Talent Acquisition Heads.",
      "Achieve monthly and quarterly revenue targets with attractive uncapped commission."
    ],
    requirements: [
      "Proven B2B sales track record in HR services, staffing, or consulting.",
      "Strong professional network across corporate leadership and HR circles.",
      "Exceptional presentation, contract negotiation, and closure skills."
    ],
    skills: ["B2B Sales", "Client Acquisition", "Contract Negotiation", "Key Account Management", "HR Services"]
  },
  {
    id: "job-6",
    title: "HR Coordinator & Payroll Associate",
    department: "HR & Talent Acquisition",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    experience: "1 - 3 Years",
    salary: "₹3,50,000 - ₹5,00,000 P.A.",
    postedDate: "5 days ago",
    description: "Support internal HR operations, candidate onboarding documentation, background verification, and contractual payroll processing.",
    responsibilities: [
      "Coordinate candidate background checks, offer letters, and document verification.",
      "Maintain HRIS records, attendance logs, and monthly client billing data.",
      "Assist in employee engagement activities and internal compliance audits."
    ],
    requirements: [
      "Degree in HR, Business Administration, or related discipline.",
      "Familiarity with MS Excel, HRIS systems, and payroll basics.",
      "High attention to detail and strong organizational skills."
    ],
    skills: ["HR Operations", "Background Verification", "Payroll Support", "Documentation", "HRIS"]
  }
];

export const CAREER_BENEFITS = [
  {
    title: "Fast-Track Career Growth",
    desc: "Performers get clear promotion paths with merit-based appraisals every 6 months.",
    icon: "TrendingUp"
  },
  {
    title: "Uncapped Commission & Incentives",
    desc: "Industry-best quarterly incentive structures for every successful candidate placement.",
    icon: "Coins"
  },
  {
    title: "Hybrid & Flexible Work Model",
    desc: "Work-life balance with flexible working hours and hybrid remote options.",
    icon: "Building"
  },
  {
    title: "Upskilling & AI Sourcing Tools",
    desc: "Access to premium sourcing platforms, LinkedIn Recruiter, and AI talent mapping software.",
    icon: "Sparkles"
  },
  {
    title: "Comprehensive Health Cover",
    desc: "Health insurance for employees and immediate family members plus wellness perks.",
    icon: "ShieldCheck"
  },
  {
    title: "Vibrant Work Culture",
    desc: "Collaborative teams, regular celebration events, offsites, and team appreciation rewards.",
    icon: "Heart"
  }
];

export const CAREER_FAQS = [
  {
    q: "How long does the hiring process take after submitting an application?",
    a: "Our HR team reviews applications within 24 to 48 hours. If shortlisted, candidates typically complete the 3-round interview process within 5 to 7 business days."
  },
  {
    q: "Do you offer remote or hybrid work options?",
    a: "Yes! Many of our recruiter, sourcing, and BD roles support hybrid schedules (combining office collaboration with remote work days)."
  },
  {
    q: "What training support is provided for new recruiters?",
    a: "Every new team member undergoes a 2-week structured onboarding program covering modern AI sourcing tools, client management, and domain-specific headhunting techniques."
  },
  {
    q: "Can I submit my CV if I don't see an exact role matching my experience?",
    a: "Absolutely! You can upload your CV using our General Resume Submission form. Our talent network team matches incoming profiles with upcoming internal and client mandates daily."
  }
];

