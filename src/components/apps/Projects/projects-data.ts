export type Project = {
	id: string;
	name: string;
	tagline: string;
	description: string;
	tech: string[];
	category: 'production' | 'ai-ml' | 'mobile' | 'iot' | 'saas';
	status: 'live' | 'complete' | 'in-progress';
	liveUrl?: string;
	githubUrl?: string;
	highlights: string[];
	metrics?: string[];
};

export const projects: Project[] = [
	{
		id: 'dealdirect',
		name: 'DealDirect',
		tagline: 'Secure Real Estate Marketplace',
		description:
			'A production-grade real estate marketplace connecting property Owners directly with Buyers, eliminating intermediary agents. Features AI-powered agreements, real-time chat, rewards ecosystem, and enterprise security.',
		tech: ['Next.js', 'React', 'Express', 'MongoDB', 'Socket.IO', 'Stripe', 'Gemini AI'],
		category: 'production',
		status: 'live',
		liveUrl: 'https://dealdirect.in',
		highlights: [
			'26 Mongoose schemas, 14 backend controllers',
			'AI agreement generation via Gemini with HMAC-SHA256 tamper detection',
			'Real-time chat with Socket.IO (conversations, typing indicators)',
			'Enterprise security: Helmet CSP, CORS lockdown, multi-tier rate limiting',
		],
		metrics: ['50,000+ records', '26 schemas', '267 press publications'],
	},
	{
		id: 'dcreators',
		name: 'DCreators',
		tagline: 'Creative Consultant Marketplace',
		description:
			'A mobile-first platform connecting Clients with Creative Consultants — featuring role-based dashboards, iterative review cycles, milestone payments, and real-time chat.',
		tech: ['React Native', 'Expo', 'Supabase', 'Zustand', 'Cloudinary'],
		category: 'mobile',
		status: 'complete',
		highlights: [
			'37 screens with role-based UI (Client vs Consultant)',
			'12-status project state machine with strict transitions',
			'Real-time chat via Supabase Realtime',
			'Floating Query system — clients broadcast needs, consultants bid',
		],
		metrics: ['37 screens', '10 DB tables', '20+ notification types'],
	},
	{
		id: 'sentinelai',
		name: 'SentinelAI',
		tagline: 'AI-Powered CCTV Surveillance',
		description:
			'A production-grade AI surveillance system transforming ordinary camera feeds into intelligent security — face recognition, crowd detection, loitering analysis, ANPR, and real-time video streaming.',
		tech: ['Python', 'FastAPI', 'YOLOv8', 'OpenCV', 'face_recognition', 'Next.js', 'WebSockets'],
		category: 'ai-ml',
		status: 'complete',
		highlights: [
			'Face recognition with 128-dim embeddings (99.38% accuracy)',
			'YOLOv8 nano model for hazard detection (knives, weapons)',
			'ANPR: YOLOv8 → Canny edge → contour analysis → EasyOCR',
			'Multi-camera support — up to 10 independent pipeline threads',
		],
		metrics: ['1,526-line VisionPipeline', '6 ML models', '7 DB tables'],
	},
	{
		id: 'dhartix',
		name: 'DhartiX / KrishiVerse',
		tagline: 'Gamified AgriTech Digital Twin',
		description:
			'An IoT-powered, gamified digital twin platform for sustainable agriculture — combining ESP32 sensors, a Godot 4 mobile game, FastAPI backend, and React dashboard.',
		tech: ['Godot 4', 'FastAPI', 'React', 'ESP32', 'SQLite', 'Leaflet'],
		category: 'iot',
		status: 'in-progress',
		highlights: [
			'Digital twin of farmer fields with real-time crop health',
			'Gamified quest system — daily AI-generated missions with XP',
			'IoT pipeline: ESP32 → HTTP POST → FastAPI → SQLite → Game',
			'Government dashboard with Leaflet map and subsidy tracking',
		],
		metrics: ['₹90.4L budget plan', '8 DB tables', '12 REST endpoints'],
	},
	{
		id: 'gitaarth',
		name: 'Gitaarth AI',
		tagline: 'Divine Spiritual Companion',
		description:
			'An AI-powered spiritual counselor embodying the Krishna-Arjun relationship — divine guidance using verified scriptures from the Bhagavad Gita and Ramayana.',
		tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Grok API', 'Google OAuth'],
		category: 'production',
		status: 'in-progress',
		highlights: [
			'Hybrid AI: Grok API + curated scripture database (~700 Gita shlokas)',
			'Dynamic persona switching — Krishna vs Ram',
			'Only verified quotes — AI never hallucinates scriptures',
			'Cosmic/celestial visual theme with divine light rays',
		],
	},
	{
		id: 'mmfc',
		name: 'MMFC Gym App',
		tagline: 'iOS 18-Style Gym Ecosystem',
		description:
			'A premium local gym management ecosystem with iOS 18 Apple Wallet-style aesthetics — React Native mobile app with bento dashboard and admin web panel.',
		tech: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Razorpay', 'MongoDB'],
		category: 'mobile',
		status: 'complete',
		highlights: [
			'iOS 18 "Big, Bold, Glass" design — squircle cards, spring animations',
			'Dynamic Island notifications with haptic feedback',
			'Bento Dashboard: Digital ID + QR, Attendance Streak ring',
			'Razorpay payment integration with iOS-style bottom sheet',
		],
	},
	{
		id: 'budgetmate',
		name: 'BudgetMate',
		tagline: 'Privacy-First Family Finance',
		description:
			'A high-performance, privacy-first family finance dashboard built with Go, HTMX, and SQLite. Ships as a single binary with zero-maintenance philosophy.',
		tech: ['Go', 'Templ', 'HTMX', 'SQLite', 'TailwindCSS', 'Docker'],
		category: 'production',
		status: 'complete',
		highlights: [
			'Single binary deployment — no separate DB servers',
			'Zero-Knowledge CSV Import — bank statements processed in memory',
			'HATEOAS API — returns HTML fragments, not JSON',
			'Distroless Docker — 95% reduced attack surface',
		],
	},
	{
		id: 'techbrahmand',
		name: 'TechBrahmand',
		tagline: 'Digital Agency Platform',
		description:
			'Client onboarding platform for a full-service digital agency — branded around the Hindu Trinity with three divine service pillars.',
		tech: ['React 19', 'Vite 7', 'TailwindCSS', 'Framer Motion', 'Express', 'MongoDB'],
		category: 'production',
		status: 'live',
		highlights: [
			'3 Service Pillars: Brahma (Create), Vishnu (Preserve), Mahesh (Transform)',
			'Lead capture pipeline: Inquiry form → MongoDB + SMTP alert',
			'Trinity color theming: Amber, Cyan, Purple',
			'AI chatbot for dynamic budget estimation (planned)',
		],
	},
	{
		id: 'defraudai',
		name: 'DeFraudAI',
		tagline: 'Deepfake Detection Platform',
		description:
			'A machine learning platform for detecting deepfake media using TensorFlow and transfer learning, deployed globally via Cloudflare Workers.',
		tech: ['Python', 'TensorFlow', 'React', 'Flask', 'Cloudflare Workers'],
		category: 'ai-ml',
		status: 'in-progress',
		highlights: [
			'92% accuracy deepfake detection model',
			'Browser extension for on-the-fly media verification',
			'Global low-latency deployment via Cloudflare Workers',
			'Transfer Learning for efficient model training',
		],
	},
	{
		id: 'moviedude',
		name: 'MovieDude',
		tagline: 'ML Recommendation System',
		description:
			'A content-based movie recommendation system using scikit-learn with cosine similarity, Min-Max normalization, and quasi-NLP attribute extraction.',
		tech: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'SQLite'],
		category: 'ai-ml',
		status: 'complete',
		highlights: [
			'Content-based filtering with cosine similarity',
			'Min-Max data normalization for user scoring',
			'Quasi-NLP to extract movie attributes',
			'Multi-binary encoding for feature vectorization',
		],
	},
	{
		id: 'srish',
		name: 'SRISH Clinical',
		tagline: 'Clinical Logbook Management',
		description:
			'A comprehensive MERN stack system for digitalizing clinical logbooks and tracking internship hours for audiology students.',
		tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Recharts'],
		category: 'production',
		status: 'complete',
		highlights: [
			'Digital Clinical Logbook with audiogram data',
			'Interactive Audiogram chart (dB HL: -10 to 120)',
			'Attendance system with automated hours calculation',
			'Dark navy-blue glassmorphism theme',
		],
	},
	{
		id: 'giftsgifts',
		name: 'GiftsNGifts',
		tagline: 'E-Commerce Gifting Platform',
		description:
			'A multi-variant e-commerce platform for gifting — with frontend, admin panel, and backend server with AI chatbot integration.',
		tech: ['React', 'Node.js', 'Express', 'Cashfree', 'MongoDB'],
		category: 'production',
		status: 'live',
		highlights: [
			'Production-deployed with real transactions',
			'AI chatbot integration for customer support',
			'Payment gateway with Cashfree',
			'Multi-iteration deployment with extensive debugging',
		],
	},
	{
		id: 'consolecv',
		name: 'ConsoleCV',
		tagline: 'AI Resume Builder SaaS',
		description:
			'A SaaS platform for AI-powered resume building with Llama 3 parsing and SSR performance optimization.',
		tech: ['Next.js', 'TypeScript', 'Groq SDK', 'NextAuth.js', 'Redis'],
		category: 'saas',
		status: 'in-progress',
		highlights: [
			'SSR via Next.js App Router for performance',
			'AI parsing of unstructured PDFs — 99% accuracy via Llama 3',
			'Secured with NextAuth.js + Redis rate limiting',
			'SaaS-ready with subscription model',
		],
	},
	{
		id: 'flight',
		name: 'Flight Booking',
		tagline: 'Full-Stack Booking System',
		description:
			'A full-stack flight booking system with real flight data from Amadeus API, Stripe payments, and auto-generated PNR codes.',
		tech: ['Next.js', 'Tailwind', 'Express', 'MongoDB', 'Amadeus API', 'Stripe'],
		category: 'production',
		status: 'complete',
		highlights: [
			'Real flight search via Amadeus Self-Service API',
			'Booking creation with auto-generated PNR',
			'Stripe Checkout + webhook payment status',
			'User dashboard with full booking history',
		],
	},
	{
		id: 'contractiq',
		name: 'ContractIQ',
		tagline: 'AI Contract Intelligence',
		description:
			'An AI-powered SaaS platform that transforms legal contracts into actionable intelligence — risk scores, extracted clauses, obligation maps, and deadline timelines.',
		tech: ['Next.js', 'FastAPI', 'spaCy', 'GPT-4o', 'PostgreSQL', 'Pinecone'],
		category: 'saas',
		status: 'complete',
		highlights: [
			'15 clause category extraction (termination, liability, IP...)',
			'Risk scoring with 10 weighted factors',
			'Obligation lifecycle tracking',
			'3 engagement options: ₹4-5L → ₹10-13L',
		],
	},
];

export const categories = [
	{ id: 'all', label: 'All Projects' },
	{ id: 'production', label: 'Production' },
	{ id: 'ai-ml', label: 'AI / ML' },
	{ id: 'mobile', label: 'Mobile' },
	{ id: 'iot', label: 'IoT' },
	{ id: 'saas', label: 'SaaS' },
] as const;
