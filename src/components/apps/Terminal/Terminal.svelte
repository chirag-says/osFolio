<script lang="ts">
	let input = $state('');
	let history = $state<{ type: 'input' | 'output'; text: string }[]>([
		{ type: 'output', text: 'DevFolio OS v1.0 — Interactive Portfolio Terminal' },
		{ type: 'output', text: 'Type "help" for available commands.\n' },
	]);
	let inputEl: HTMLInputElement;

	const commands: Record<string, () => string> = {
		help: () =>
			`Available commands:
  whoami        — Who am I?
  skills        — Technical skills
  projects      — List all projects
  experience    — Work experience
  education     — Education details
  contact       — Contact information
  resume        — Download my resume
  neofetch      — System information
  clear         — Clear terminal
  sudo hire chirag — Try it ;)
  ls            — List desktop apps
  cat about.txt — Read about me`,

		whoami: () => 'Chirag — Full Stack Software Engineer | Bengaluru, India',

		skills: () =>
			`Languages    → JavaScript, TypeScript, Python, Go, Java, C++
Frontend     → React, Next.js, React Native, Svelte, TailwindCSS
Backend      → Node.js, Express, FastAPI, Flask
Database     → MongoDB, PostgreSQL, Supabase, SQLite, Redis
AI/ML        → TensorFlow, YOLOv8, OpenCV, face_recognition, Grok/Gemini API
Cloud        → AWS (EC2, S3), Docker, Nginx, Vercel
Payments     → Stripe, Razorpay, Cashfree
Real-time    → Socket.IO, WebSockets, Supabase Realtime`,

		projects: () =>
			`┌─────────────────────┬───────────────────────────────────┬──────────┐
│ Project             │ Description                       │ Status   │
├─────────────────────┼───────────────────────────────────┼──────────┤
│ DealDirect          │ Real Estate Marketplace            │ 🟢 Live  │
│ DCreators           │ Creative Consultant Marketplace    │ ✅ Done  │
│ SentinelAI          │ AI CCTV Surveillance               │ ✅ Done  │
│ DhartiX             │ Gamified AgriTech Digital Twin      │ 🔨 WIP  │
│ Gitaarth AI         │ Divine Spiritual Companion          │ 🔨 WIP  │
│ MMFC Gym            │ iOS 18-Style Gym Ecosystem          │ ✅ Done  │
│ BudgetMate          │ Go + HTMX Family Finance            │ ✅ Done  │
│ TechBrahmand        │ Digital Agency Platform              │ 🟢 Live  │
│ DeFraudAI           │ Deepfake Detection                   │ 🔨 WIP  │
│ GiftsNGifts         │ E-Commerce Gifting                    │ 🟢 Live  │
│ ConsoleCV           │ AI Resume Builder SaaS                │ 🔨 WIP  │
│ SRISH               │ Clinical Logbook MERN App             │ ✅ Done  │
│ ContractIQ          │ AI Contract Intelligence              │ ✅ Done  │
│ Flight Booking      │ Amadeus + Stripe Booking              │ ✅ Done  │
│ MovieDude           │ ML Recommendation Engine              │ ✅ Done  │
└─────────────────────┴───────────────────────────────────┴──────────┘`,

		experience: () =>
			`╭─ IshiSoft Pvt Ltd ── Software Engineer Intern ── Nov 2025 – Present ─╮
│  • Built real estate marketplace managing 50,000+ records             │
│  • Optimized MongoDB — 60% query latency reduction                   │
│  • Real-time chat with Socket.IO + Redis                             │
│  • RBAC, JWT Auth, OAuth 2.0 security protocols                      │
╰──────────────────────────────────────────────────────────────────────╯

╭─ COMEDKARES ── SDE Intern ── June 2024 – Dec 2024 ──────────────────╮
│  • FastAPI backend ingesting 10,000+ daily telemetry points          │
│  • 40% performance gain via Redis caching                            │
│  • Docker, Nginx, AWS EC2 — 99.9% uptime                            │
│  • Led Agile team of 4 engineers                                     │
╰──────────────────────────────────────────────────────────────────────╯`,

		education: () =>
			`🎓 Atria Institute of Technology, Bengaluru
   B.E. in Computer Science & Engineering
   CGPA: 8.5/10 | 2023 – 2027

📜 Certifications:
   • IBM AI For All (2024)
   • Oracle Certified Java Associate (2023)
   • AWS Cloud Practitioner (In Progress)`,

		contact: () =>
			`📧 Email     → chiragbaldia@gmail.com
📱 Phone     → +91 636-012-2696
🔗 LinkedIn  → linkedin.com/in/chirag
🐙 GitHub    → github.com/chiragbaldia`,

		resume: () => {
			window.open('/resume/Chirag_Resume.pdf', '_blank');
			return '📄 Opening resume in a new tab...';
		},

		neofetch: () =>
			`        >_                chirag@devfolio-os
       /  \\               ──────────────────
      /    \\              OS: DevFolio OS v1.0
     /______\\             Kernel: Svelte 5.34
    |   >_   |            Shell: chirag-sh
    |________|            DE: macOS Web
                          Theme: Dark
                          Terminal: DevFolio Terminal
                          Projects: 15
                          Languages: 8
                          Uptime: since Nov 2025`,

		ls: () =>
			`Projects.app    Resume.app    Terminal.app
Skills.app      Contact.app   Calculator.app
Calendar.app    Wallpapers.app  AboutMe.app`,

		'cat about.txt': () =>
			`Hi! I'm Chirag, a Full Stack Software Engineer from Bengaluru.
I build scalable web apps, real-time systems, and AI platforms.
Currently interning at IshiSoft, pursuing B.E. at Atria IT.
I love turning complex problems into elegant, production-grade code.`,

		'sudo hire chirag': () =>
			`[sudo] password for recruiter: ••••••••
✅ Access granted!
🎉 Excellent choice! Sending resume to your inbox...
📧 chiragbaldia@gmail.com | 📱 +91 636-012-2696

> "The best way to predict the future is to build it." — Chirag, probably.`,

		clear: () => '__CLEAR__',
	};

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && input.trim()) {
			const cmd = input.trim().toLowerCase();
			history = [...history, { type: 'input', text: `chirag@devfolio-os ~ % ${input}` }];

			if (commands[cmd]) {
				const result = commands[cmd]();
				if (result === '__CLEAR__') {
					history = [];
				} else {
					history = [...history, { type: 'output', text: result }];
				}
			} else {
				history = [
					...history,
					{ type: 'output', text: `zsh: command not found: ${input}\nType "help" for available commands.` },
				];
			}
			input = '';
		}
	}

	function focusInput() {
		inputEl?.focus();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section class="container" onclick={focusInput}>
	<header class="titlebar app-window-drag-handle">
		<span class="title-text">chirag@devfolio-os — zsh</span>
	</header>

	<div class="terminal-body">
		{#each history as line}
			<pre class={line.type}>{line.text}</pre>
		{/each}

		<div class="input-line">
			<span class="prompt">chirag@devfolio-os ~ %&nbsp;</span>
			<input
				bind:this={inputEl}
				bind:value={input}
				onkeydown={handleKeydown}
				class="cmd-input"
				spellcheck="false"
				autocomplete="off"
			/>
		</div>
	</div>
</section>

<style>
	.container {
		background-color: rgba(30, 30, 30, 0.95);
		border-radius: inherit;
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
	}

	.titlebar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.8rem;
		background: rgba(45, 45, 45, 0.95);
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}

	.traffic-dots {
		display: flex;
		gap: 0.4rem;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.dot.red { background: #ff5f57; }
	.dot.yellow { background: #ffbd2e; }
	.dot.green { background: #28c840; }

	.title-text {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.75rem;
		flex: 1;
		text-align: center;
	}

	.terminal-body {
		padding: 0.75rem 1rem;
		overflow-y: auto;
		color: #f0f0f0;
	}

	pre {
		margin: 0;
		white-space: pre-wrap;
		word-break: break-word;
		font-size: 0.78rem;
		line-height: 1.5;
		font-family: inherit;
	}

	pre.input {
		color: #28c840;
	}

	pre.output {
		color: #e0e0e0;
		margin-bottom: 0.35rem;
	}

	.input-line {
		display: flex;
		align-items: center;
		margin-top: 0.25rem;
	}

	.prompt {
		color: #28c840;
		font-size: 0.78rem;
		white-space: nowrap;
	}

	.cmd-input {
		background: transparent;
		border: none;
		outline: none;
		color: #f0f0f0;
		font-family: inherit;
		font-size: 0.78rem;
		flex: 1;
		caret-color: #28c840;
	}
</style>
