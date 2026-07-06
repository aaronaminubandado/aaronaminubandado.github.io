window.PORTFOLIO_PROJECTS = [
  {
    "id": "billa",
    "title": "Billa",
    "tagline": "Personal finance tracker",
    "year": "2025",
    "role": "Solo \u00b7 Full-stack",
    "status": "Beta",
    "featured": true,
    "shortDescription": "A personal finance tracker for logging income, expenses, budgets, and goals, built on Next.js 14 and Supabase with row-level security.",
    "tech": [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
      "Zod",
      "Vitest"
    ],
    "repoUrl": "https://github.com/aaronaminubandado/billa",
    "liveUrl": "https://billa-beige.vercel.app",
    "images": [
      "./assets/billa.png"
    ],
    "caseStudy": {
      "overview": "Billa is a web app for managing personal finances (income, expenses, budgets, wallets, and goals) with a dashboard of metrics and charts. Built with Next.js 14 (App Router) and Supabase.",
      "problem": "Tracking money across categories and wallets usually means spreadsheets or apps that leak your data between accounts. Billa needed multi-user financial data that stays strictly private to each user.",
      "constraints": "Solo build, still in beta. No dedicated backend team, so data access and security had to be enforced at the database layer rather than trusted from the client.",
      "approach": "Model the domain in PostgreSQL (transactions, categories, wallets, budgets, goals), validate every input with Zod, and use Next.js Server Actions instead of hand-rolled API routes to keep mutations colocated and type-safe.",
      "architecture": "Next.js 14 App Router with Server Actions and middleware for auth-gated routes. Supabase provides PostgreSQL, authentication (email/password + OAuth), and Row-Level Security. UI is Tailwind + shadcn/ui; charts use Recharts.",
      "decisions": [
        "Row-Level Security in Postgres so each user can only ever read/write their own rows, enforced by the database, not the UI.",
        "Server Actions over REST routes to reduce boilerplate and keep validation server-side.",
        "Zod schemas as the single source of truth for input validation.",
        "Vitest unit tests plus a script that verifies RLS policies against a live database."
      ],
      "challenges": "Getting Row-Level Security policies correct and provably enforced, solved with a documented security checklist and an automated RLS verification script.",
      "results": "TODO: add adoption/usage metrics if available (currently in beta).",
      "lessons": "Pushing authorization down to the database (RLS) made the app safer by default and simplified the application code above it."
    }
  },
  {
    "id": "bluenest-bot",
    "title": "BlueNestBot",
    "tagline": "AI-assisted real-estate chatbot",
    "year": "2026",
    "role": "Solo \u00b7 Backend",
    "status": "Live",
    "featured": true,
    "shortDescription": "A Telegram chatbot for a real-estate agency that answers questions, captures leads, and falls back to an AI model when no rule matches.",
    "tech": [
      "Node.js",
      "Telegraf",
      "Telegram Bot API",
      "OpenRouter AI",
      "REST"
    ],
    "repoUrl": "https://github.com/aaronaminubandado/bluenest-bot",
    "liveUrl": "",
    "images": [
      "./assets/placeholder.png"
    ],
    "caseStudy": {
      "overview": "BlueNestBot is the first point of contact for a real-estate business on Telegram. It handles greetings and FAQs, captures leads, escalates to a human agent, and uses an AI model as a fallback for anything it doesn't recognise.",
      "problem": "A real-estate agency needed to respond to buyers and renters instantly, capture their details, and hand off to a human when needed, without paying for an AI call on every single message.",
      "constraints": "Responses had to stay on-brand and predictable, AI usage had to be minimised for cost and safety, and admin identifiers could not be hard-coded in a public repo.",
      "approach": "A layered message pipeline that resolves the cheapest, most predictable handler first and only reaches for the AI model when nothing else matches.",
      "architecture": "Built on the Telegraf framework. Incoming messages flow through an ordered pipeline: commands \u2192 active lead-capture sessions \u2192 common replies \u2192 rule-based FAQ matching \u2192 human-escalation triggers \u2192 AI fallback. A structured business context (services, hours, tone, escalation policy) is injected into AI requests.",
      "decisions": [
        "Rule-first routing so predictable intents never hit the AI model.",
        "AI only as a fallback, grounded with business context to keep replies safe and relevant.",
        "Stateful lead-capture sessions to collect name, contact, and intent.",
        "Admin access resolved from environment configuration, never hard-coded."
      ],
      "challenges": "Balancing conversational flexibility with predictability: the layered pipeline keeps behaviour deterministic while still handling open-ended questions.",
      "results": "TODO: add lead-volume or deployment metrics if available.",
      "lessons": "Combining rule-based logic with a scoped AI fallback gives reliable behaviour at a fraction of the cost of an AI-first bot."
    }
  },
  {
    "id": "jias-gadgets",
    "title": "Jia's Gadgets",
    "tagline": "E-commerce storefront",
    "year": "2025",
    "role": "Solo \u00b7 Frontend",
    "status": "Live",
    "featured": true,
    "shortDescription": "A React e-commerce storefront that consumes a REST API for products and auth, with a Stripe-based checkout flow.",
    "tech": [
      "React",
      "JavaScript",
      "REST API",
      "Stripe",
      "Netlify"
    ],
    "repoUrl": "https://github.com/aaronaminubandado/jias-gadgets.git",
    "liveUrl": "https://jiasgadgets.netlify.app/",
    "images": [
      "./assets/jias-gadgets.png"
    ],
    "caseStudy": {
      "overview": "A React-based e-commerce frontend built as an iterative MVP: storefront presentation, page-based navigation, and a checkout flow wired for Stripe, structured to plug into a REST API backend.",
      "problem": "Build a storefront that demonstrates real e-commerce user flows and is ready to integrate with a live product/auth/payments API, rather than a static mockup.",
      "constraints": "Deliberately an MVP, prioritising structure and extensibility over visual polish, with API integration only partially implemented.",
      "approach": "Design clear integration points (product listing, auth, checkout, order history) and a modular component structure so the frontend can be connected to the backend without rework.",
      "architecture": "React SPA deployed on Netlify. Environment variables hold the API base URL. Checkout is designed around Stripe (tested with Stripe test cards); demo customer and store accounts exercise the user flows.",
      "decisions": [
        "Modular components with clean separation of concerns.",
        "Environment-driven API base URLs for portable deployment.",
        "Stripe test-mode checkout to validate the payment flow end to end."
      ],
      "challenges": "Structuring the frontend so real API and Stripe integration can be dropped in incrementally.",
      "results": "TODO: add outcomes once full API/Stripe integration ships.",
      "lessons": "Designing explicit integration seams up front makes a frontend genuinely ready for full-stack integration."
    }
  }
];
