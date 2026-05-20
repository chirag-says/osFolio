<script lang="ts">
	import { onMount, tick } from 'svelte';

	let input = $state('');
	let history = $state<{ type: 'input' | 'output' | 'html'; text: string }[]>([
		{ type: 'output', text: 'Chirag OS v1.0 — Interactive Portfolio Terminal' },
		{ type: 'output', text: 'Type "help" for available commands.\n' },
	]);
	let inputEl: HTMLInputElement;
	let terminalBody: HTMLDivElement;
	let commandHistory = $state<string[]>([]);
	let historyIndex = $state(-1);
	let isDestroyed = $state(false);

	function scrollToBottom() {
		tick().then(() => {
			if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
		});
	}

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
  sudo rm -rf / — Don't do it!
  ls            — List desktop apps
  cat about.txt — Read about me
  date          — Current date & time
  echo [text]   — Echo back text
  history       — Command history`,

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
🐙 GitHub    → github.com/chirag-says`,

		resume: () => {
			window.open('/resume/Chirag_Resume.pdf', '_blank');
			return '📄 Opening resume in a new tab...';
		},

		neofetch: () =>
			`        ██████╗███████╗       chirag@chirag-os
       ██╔════╝██╔════╝       ──────────────────
       ██║     ███████╗       OS: Chirag OS v1.0
       ██║     ╚════██║       Kernel: Svelte 5.34
       ╚██████╗███████║       Shell: chirag-sh
        ╚═════╝╚══════╝       DE: macOS Web
                              Theme: Dark
                              Terminal: Portfolio Terminal
                              Projects: 15
                              Languages: 8
                              Uptime: since Nov 2025`,

		ls: () =>
			`Projects.app    Resume.app    Terminal.app
Skills.app      Contact.app   Calculator.app
Calendar.app    Wallpapers.app  AboutMe.app
Camera.app      Gallery.app   VSCode.app`,

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

		'sudo rm -rf /': () => '__DESTROY__',

		date: () => new Date().toLocaleString('en-IN', {
			weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
			hour: '2-digit', minute: '2-digit', second: '2-digit',
		}),

		history: () => commandHistory.length
			? commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n')
			: 'No commands in history.',

		clear: () => '__CLEAR__',
	};

	async function destroySequence() {
		isDestroyed = true;
		const lines = [
			'[sudo] password for root: ••••••••',
			'rm: removing /System...',
			'rm: removing /Applications...',
			'rm: removing /Users/chirag/Projects...',
			'rm: removing /Library...',
			'rm: removing /usr...',
			'',
			'💀 KERNEL PANIC — Fatal error: filesystem destroyed',
			'',
			'Just kidding 😄 Refreshing in 3 seconds...',
		];

		for (const line of lines) {
			history = [...history, { type: 'output', text: line }];
			scrollToBottom();
			await new Promise(r => setTimeout(r, 300));
		}

		await new Promise(r => setTimeout(r, 3000));
		isDestroyed = false;
		history = [
			{ type: 'output', text: 'Chirag OS v1.0 — Interactive Portfolio Terminal' },
			{ type: 'output', text: 'System restored. Type "help" for available commands.\n' },
		];
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (commandHistory.length > 0) {
				historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
				input = commandHistory[commandHistory.length - 1 - historyIndex];
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			historyIndex = Math.max(historyIndex - 1, -1);
			input = historyIndex >= 0 ? commandHistory[commandHistory.length - 1 - historyIndex] : '';
			return;
		}

		if (e.key === 'Enter' && input.trim()) {
			const cmd = input.trim().toLowerCase();
			const rawInput = input.trim();
			commandHistory = [...commandHistory, rawInput];
			historyIndex = -1;
			history = [...history, { type: 'input', text: `chirag@chirag-os ~ % ${rawInput}` }];

			// Handle echo command
			if (cmd.startsWith('echo ')) {
				const text = rawInput.substring(5);
				history = [...history, { type: 'output', text }];
			} else if (commands[cmd]) {
				const result = commands[cmd]();
				if (result === '__CLEAR__') {
					history = [];
				} else if (result === '__DESTROY__') {
					input = '';
					destroySequence();
					return;
				} else {
					history = [...history, { type: 'output', text: result }];
				}
			} else {
				history = [
					...history,
					{ type: 'output', text: `zsh: command not found: ${rawInput}\nType "help" for available commands.` },
				];
			}
			input = '';
			scrollToBottom();
		}
	}

	function focusInput() {
		inputEl?.focus();
	}

	onMount(() => {
		inputEl?.focus();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section class="container" class:destroyed={isDestroyed} onclick={focusInput}>
	<header class="titlebar app-window-drag-handle">
		<span class="title-text">chirag@chirag-os — zsh</span>
	</header>

	<div class="terminal-body" bind:this={terminalBody}>
		{#each history as line}
			{#if line.type === 'html'}
				{@html line.text}
			{:else}
				<pre class={line.type}>{line.text}</pre>
			{/if}
		{/each}

		{#if !isDestroyed}
			<div class="input-line">
				<span class="prompt">chirag@chirag-os ~ %&nbsp;</span>
				<input
					bind:this={inputEl}
					bind:value={input}
					onkeydown={handleKeydown}
					class="cmd-input"
					spellcheck="false"
					autocomplete="off"
				/>
			</div>
		{/if}
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
		transition: filter 0.5s ease;
	}

	.container.destroyed {
		animation: glitch 0.3s ease-in-out infinite;
	}

	@keyframes glitch {
		0% { filter: none; }
		20% { filter: hue-rotate(90deg) saturate(3); }
		40% { filter: none; transform: translate(2px, -1px); }
		60% { filter: hue-rotate(-90deg) brightness(1.5); }
		80% { filter: invert(0.1); transform: translate(-1px, 1px); }
		100% { filter: none; }
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
