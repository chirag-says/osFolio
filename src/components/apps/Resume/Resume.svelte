<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import IconUser from '~icons/ph/user-circle';
	import IconGradCap from '~icons/ph/graduation-cap';
	import IconBriefcase from '~icons/ph/briefcase';
	import IconCertificate from '~icons/ph/certificate';
	import IconCode from '~icons/ph/code';
	import IconFolder from '~icons/ph/folder-notch';
	import IconMail from '~icons/ph/envelope-simple';
	import IconPhone from '~icons/ph/phone';
	import IconDownload from '~icons/ph/download-simple';
	import IconGithub from '~icons/ph/github-logo';
	import IconCodeBrackets from '~icons/ph/brackets-curly';
	import IconMapPin from '~icons/ph/map-pin';

	const sidebarItems = [
		{ id: 'overview', label: 'Overview', icon: IconUser },
		{ id: 'education', label: 'Education', icon: IconGradCap },
		{ id: 'experience', label: 'Experience', icon: IconBriefcase },
		{ id: 'certifications', label: 'Certifications', icon: IconCertificate },
		{ id: 'skills', label: 'Skills', icon: IconCode },
		{ id: 'projects', label: 'Projects', icon: IconFolder },
	];

	let activeView = $state('overview');

	const topSkills = [
		{ name: 'JavaScript', level: 5 }, { name: 'TypeScript', level: 5 },
		{ name: 'React / Next.js', level: 5 }, { name: 'Python', level: 4 },
		{ name: 'Node.js', level: 5 }, { name: 'MongoDB', level: 5 },
		{ name: 'Go', level: 3 },
	];

	function dots(n: number) { return Array.from({ length: 5 }, (_, i) => i < n); }
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<header class="titlebar app-window-drag-handle">
		<span class="titlebar-text">Resume</span>
		<div class="titlebar-actions">
			<a href="/resume/Chirag_Resume.pdf" target="_blank" rel="noopener noreferrer" class="tb-btn">
				<IconDownload /> Export PDF
			</a>
		</div>
	</header>

	<!-- Left Sidebar -->
	<aside class="sidebar-left">
		<nav>
			{#each sidebarItems as item}
				<button class="nav-item" class:active={activeView === item.id} onclick={() => (activeView = item.id)}>
					<svelte:component this={item.icon} />
					<span>{item.label}</span>
				</button>
			{/each}
		</nav>
		<div class="sidebar-footer">
			<img src="/profile/chirag.png" alt="Chirag" class="sidebar-avatar" />
			<div><span class="sf-name">Chirag</span><span class="sf-loc">Bengaluru, India</span></div>
		</div>
	</aside>

	<!-- Main Content -->
	<section class="main-content">
		{#if activeView === 'overview'}
			<!-- OVERVIEW: full resume -->
			<div class="profile-header">
				<img src="/profile/chirag.png" alt="Chirag" class="profile-pic" />
				<div>
					<h1 class="profile-name">Chirag</h1>
					<p class="profile-role">Full Stack Software Engineer</p>
					<div class="profile-contact">
						<span><IconMapPin /> Bengaluru, India</span>
						<span><IconMail /> chiragbaldia@gmail.com</span>
						<span><IconPhone /> +91 636 012 2696</span>
					</div>
				</div>
			</div>
			<div class="divider"></div>
			<h2 class="sh"><IconUser /> About Me</h2>
			<p class="body">Motivated Full Stack Software Engineer with a passion for building scalable web applications, real-time systems, and AI-powered platforms. Currently building production-grade software serving thousands of users at IshiSoft. Strong foundation in system design, database optimization, and end-to-end product development.</p>
			<div class="divider"></div>
			<h2 class="sh"><IconGradCap /> Education</h2>
			<div class="entry-head"><div><h3>Atria Institute of Technology</h3><p class="sub">B.E. Computer Science & Engineering</p></div><span class="date">2023 – 2027</span></div>
			<p class="meta">CGPA: 8.5 / 10</p>
			<div class="divider"></div>
			<h2 class="sh"><IconBriefcase /> Experience</h2>
			<div class="entry">
				<div class="entry-head"><div><h3>Software Engineer Intern</h3><p class="sub">IshiSoft Pvt Ltd</p></div><span class="date">Nov 2025 – Present</span></div>
				<ul><li>Built Real Estate Marketplace managing 50,000+ records</li><li>60% MongoDB query latency reduction</li><li>Real-time chat with Socket.IO + Redis</li></ul>
			</div>
			<div class="entry">
				<div class="entry-head"><div><h3>SDE Intern</h3><p class="sub">COMEDKARES</p></div><span class="date">Jun – Dec 2024</span></div>
				<ul><li>FastAPI backend — 10,000+ daily telemetry points</li><li>40% perf gain via Redis caching</li><li>Docker + AWS EC2 — 99.9% uptime</li></ul>
			</div>

		{:else if activeView === 'education'}
			<h2 class="page-title"><IconGradCap /> Education</h2>
			<div class="card">
				<div class="entry-head"><div><h3>Atria Institute of Technology, Bengaluru</h3><p class="sub">B.E. in Computer Science & Engineering</p></div><span class="date">2023 – 2027</span></div>
				<p class="meta">CGPA: 8.5 / 10</p>
				<div class="divider"></div>
				<h4 class="subhead">Relevant Coursework</h4>
				<p class="body">Data Structures & Algorithms, Database Management Systems, Computer Networks, Operating Systems, Machine Learning, Software Engineering, Web Technologies</p>
			</div>

		{:else if activeView === 'experience'}
			<h2 class="page-title"><IconBriefcase /> Work Experience</h2>
			<div class="card">
				<div class="entry-head"><div><h3>Software Engineer Intern</h3><p class="sub">IshiSoft Pvt Ltd</p></div><span class="date">Nov 2025 – Present</span></div>
				<ul><li>Built scalable Real Estate Marketplace managing 50,000+ property records across 26 schemas</li><li>Optimized MongoDB aggregation pipelines — 60% query latency reduction</li><li>Real-time chat with Socket.IO + Redis pub/sub (typing indicators, read receipts)</li><li>Automated legal agreement PDF generation — 90% manual work reduction</li><li>Enterprise security: RBAC, JWT Auth, OAuth 2.0, Helmet CSP, rate limiting</li></ul>
			</div>
			<div class="card">
				<div class="entry-head"><div><h3>SDE Intern</h3><p class="sub">COMEDKARES</p></div><span class="date">Jun 2024 – Dec 2024</span></div>
				<ul><li>FastAPI backend ingesting 10,000+ daily IoT telemetry data points</li><li>40% performance improvement via Redis caching + connection pooling</li><li>Docker, Nginx, AWS EC2 deployment — 99.9% uptime</li><li>Led Agile team of 4 engineers through sprint planning and code reviews</li></ul>
			</div>

		{:else if activeView === 'certifications'}
			<h2 class="page-title"><IconCertificate /> Certifications</h2>
			<div class="card">
				<div class="cert-row"><span class="cert-name">IBM AI For All</span><span class="cert-year">2024</span></div>
				<div class="cert-row"><span class="cert-name">Oracle Certified Java Associate</span><span class="cert-year">2023</span></div>
				<div class="cert-row"><span class="cert-name">AWS Cloud Practitioner</span><span class="cert-year">In Progress</span></div>
			</div>

		{:else if activeView === 'skills'}
			<h2 class="page-title"><IconCode /> Technical Skills</h2>
			<div class="card">
				<div class="sk-row"><span class="sk-label">Languages</span><span class="sk-val">JavaScript, TypeScript, Python, Go, Java, C++, SQL</span></div>
				<div class="sk-row"><span class="sk-label">Frontend</span><span class="sk-val">React, Next.js, React Native, Svelte, TailwindCSS, Framer Motion</span></div>
				<div class="sk-row"><span class="sk-label">Backend</span><span class="sk-val">Node.js, Express, FastAPI, Flask, Socket.IO</span></div>
				<div class="sk-row"><span class="sk-label">Data & Cloud</span><span class="sk-val">MongoDB, PostgreSQL, Supabase, Redis, AWS, Docker, Nginx</span></div>
				<div class="sk-row"><span class="sk-label">AI / ML</span><span class="sk-val">TensorFlow, YOLOv8, OpenCV, scikit-learn, Gemini, Grok API</span></div>
				<div class="sk-row"><span class="sk-label">Payments</span><span class="sk-val">Stripe, Razorpay, Cashfree</span></div>
			</div>

		{:else if activeView === 'projects'}
			<h2 class="page-title"><IconFolder /> Key Projects</h2>
			<div class="card proj">
				<div class="proj-head"><h3>DealDirect</h3><span class="tag live">Live</span></div>
				<p>Production real estate marketplace — Next.js, Express, MongoDB, Socket.IO, Stripe, Gemini AI. 50,000+ records, 267 press publications.</p>
			</div>
			<div class="card proj">
				<div class="proj-head"><h3>SentinelAI</h3><span class="tag">Complete</span></div>
				<p>AI CCTV surveillance — YOLOv8, face_recognition, FastAPI, WebSockets. 99.38% face recognition accuracy, 6 ML models.</p>
			</div>
			<div class="card proj">
				<div class="proj-head"><h3>DCreators</h3><span class="tag">Complete</span></div>
				<p>Creative consultant marketplace — React Native, Expo, Supabase. 37 screens, 12-status state machine, real-time chat.</p>
			</div>
			<div class="card proj">
				<div class="proj-head"><h3>BudgetMate</h3><span class="tag">Complete</span></div>
				<p>Privacy-first family finance — Go, Templ, HTMX, SQLite. Ships as single binary, zero-maintenance.</p>
			</div>
		{/if}
	</section>

	<!-- Right Sidebar -->
	<aside class="sidebar-right">
		<div class="right-card">
			<h3 class="rt"><IconCodeBrackets /> Top Skills</h3>
			<div class="skills-list">
				{#each topSkills as skill}
					<div class="skill-row">
						<span class="sn">{skill.name}</span>
						<div class="sd">{#each dots(skill.level) as filled}<span class="dot" class:filled></span>{/each}</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="right-card">
			<h3 class="rt"><IconDownload /> Quick Actions</h3>
			<a href="/resume/Chirag_Resume.pdf" target="_blank" rel="noopener noreferrer" class="qa"><IconDownload /><div><span class="qa-l">Download PDF</span><span class="qa-d">Export as document</span></div></a>
			<a href="mailto:chiragbaldia@gmail.com" class="qa"><IconMail /><div><span class="qa-l">Contact Me</span><span class="qa-d">Send an email</span></div></a>
			<a href="https://github.com/chirag-says" target="_blank" rel="noopener noreferrer" class="qa"><IconGithub /><div><span class="qa-l">View GitHub</span><span class="qa-d">See my code</span></div></a>
		</div>
	</aside>
</section>

<style>
	.container {
		--accent: #6c5ce7; --accent-soft: rgba(108,92,231,0.08);
		--bg: #fff; --sidebar-bg: #f8f7fc; --border: rgba(0,0,0,0.07);
		--text-1: #1a1a2e; --text-2: #6b7280; --text-3: #9ca3af;
		--card-bg: #fff; --card-border: rgba(0,0,0,0.06);
		display: grid; grid-template-columns: 10.5rem 1fr 13.5rem;
		grid-template-rows: 2.5rem 1fr; border-radius: inherit; height: 100%; overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
		-webkit-font-smoothing: antialiased; color: var(--text-1); background: var(--bg);
	}
	.container.dark {
		--bg: #1a1a2e; --sidebar-bg: #16162b; --border: rgba(255,255,255,0.06);
		--text-1: #e8e8f0; --text-2: #8b8ba0; --text-3: #5e5e78;
		--card-bg: rgba(255,255,255,0.04); --card-border: rgba(255,255,255,0.06);
	}

	.titlebar {
		grid-area: 1/1/span 1/span 3; display: flex; justify-content: center; align-items: center;
		z-index: 2; user-select: none; border-bottom: 0.5px solid var(--border);
		border-top-left-radius: inherit; border-top-right-radius: inherit; position: relative;
	}
	.titlebar-text { font-size: 0.8125rem; font-weight: 600; }
	.titlebar-actions { position: absolute; right: 0.75rem; }
	.tb-btn {
		display: flex; align-items: center; gap: 0.25rem; font-size: 0.68rem;
		padding: 0.2rem 0.55rem; border-radius: 4px; text-decoration: none;
		font-weight: 600; background: var(--accent); color: white;
	}
	.tb-btn:hover { filter: brightness(0.9); }
	.tb-btn :global(svg) { font-size: 0.78rem; }

	/* Sidebar Left */
	.sidebar-left {
		grid-area: 2/1/span 1/span 1; background: var(--sidebar-bg);
		border-right: 0.5px solid var(--border); display: flex; flex-direction: column;
		padding: 0.6rem 0.45rem; overflow-y: auto; border-bottom-left-radius: inherit;
	}
	nav { display: flex; flex-direction: column; gap: 2px; }
	.nav-item {
		display: flex; align-items: center; justify-content: flex-start; gap: 0.4rem; width: 100%;
		padding: 0.4rem 0.55rem; border-radius: 0.35rem; border: none;
		background: transparent; cursor: pointer; font-size: 0.78rem;
		color: var(--text-2); text-align: left; font-weight: 500; transition: all 80ms ease;
	}
	.nav-item :global(svg) { font-size: 0.95rem; flex-shrink: 0; }
	.nav-item:hover { background: var(--accent-soft); color: var(--accent); }
	.nav-item.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }

	.sidebar-footer {
		margin-top: auto; padding: 0.5rem; display: flex; align-items: center;
		gap: 0.45rem; border-top: 0.5px solid var(--border); padding-top: 0.65rem;
	}
	.sidebar-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
	.sf-name { display: block; font-size: 0.72rem; font-weight: 600; color: var(--text-1); }
	.sf-loc { display: block; font-size: 0.6rem; color: var(--text-3); }

	/* Main */
	.main-content {
		grid-area: 2/2/span 1/span 1; overflow-y: auto; padding: 1.25rem 1.5rem;
		border-right: 0.5px solid var(--border);
	}

	.profile-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.4rem; }
	.profile-pic { width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }
	.profile-name { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; }
	.profile-role { font-size: 0.8rem; color: var(--text-2); margin-top: 0.1rem; }
	.profile-contact { display: flex; gap: 0.85rem; margin-top: 0.35rem; font-size: 0.7rem; color: var(--text-2); flex-wrap: wrap; }
	.profile-contact span { display: flex; align-items: center; gap: 0.2rem; }
	.profile-contact :global(svg) { font-size: 0.8rem; color: var(--accent); }

	.divider { height: 0.5px; background: var(--border); margin: 0.55rem 0; }

	.sh { font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.35rem; }
	.sh :global(svg) { font-size: 1rem; color: var(--accent); }

	.page-title { font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 1rem; letter-spacing: -0.01em; }
	.page-title :global(svg) { font-size: 1.2rem; color: var(--accent); }

	.body { font-size: 0.78rem; line-height: 1.65; color: var(--text-2); }
	.meta { font-size: 0.72rem; color: var(--text-2); margin-top: 0.15rem; }

	.card {
		background: var(--card-bg); border: 0.5px solid var(--card-border);
		border-radius: 0.5rem; padding: 0.85rem 1rem; margin-bottom: 0.5rem;
	}

	.entry { margin-bottom: 0.55rem; }
	.entry:last-child { margin-bottom: 0; }
	.entry-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.2rem; }
	.entry-head h3 { font-size: 0.82rem; font-weight: 600; }
	.sub { font-size: 0.72rem; color: var(--text-2); margin-top: 0.05rem; }
	.subhead { font-size: 0.75rem; font-weight: 600; margin-bottom: 0.3rem; }
	.date { font-size: 0.66rem; color: var(--text-3); white-space: nowrap; flex-shrink: 0; }

	ul { margin: 0.3rem 0 0; padding-left: 1rem; list-style: none; }
	li { font-size: 0.74rem; line-height: 1.55; color: var(--text-2); position: relative; padding-left: 0.5rem; margin-bottom: 0.1rem; }
	li::before { content: '›'; position: absolute; left: -0.6rem; color: var(--accent); font-weight: 700; font-size: 0.82rem; }

	.cert-row { display: flex; justify-content: space-between; padding: 0.3rem 0; border-bottom: 0.5px solid var(--border); }
	.cert-row:last-child { border-bottom: none; }
	.cert-name { font-size: 0.78rem; font-weight: 500; }
	.cert-year { font-size: 0.66rem; color: var(--text-3); }

	.sk-row { display: flex; gap: 0.5rem; font-size: 0.74rem; line-height: 1.5; padding: 0.2rem 0; border-bottom: 0.5px solid var(--border); }
	.sk-row:last-child { border-bottom: none; }
	.sk-label { font-weight: 600; min-width: 5.5rem; flex-shrink: 0; }
	.sk-val { color: var(--text-2); }

	.proj { margin-bottom: 0.5rem; }
	.proj-head { display: flex; align-items: baseline; gap: 0.4rem; margin-bottom: 0.15rem; }
	.proj-head h3 { font-size: 0.8rem; font-weight: 600; }
	.tag { font-size: 0.58rem; color: var(--accent); font-weight: 500; }
	.tag.live { color: #34c759; }
	.proj > p, .card.proj > p { font-size: 0.72rem; color: var(--text-2); line-height: 1.5; }

	/* Right Sidebar */
	.sidebar-right {
		grid-area: 2/3/span 1/span 1; background: var(--sidebar-bg);
		overflow-y: auto; padding: 0.6rem 0.5rem; display: flex;
		flex-direction: column; gap: 0.5rem; border-bottom-right-radius: inherit;
	}
	.right-card { background: var(--card-bg); border: 0.5px solid var(--card-border); border-radius: 0.5rem; padding: 0.6rem; }
	.rt { font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.45rem; }
	.rt :global(svg) { font-size: 0.85rem; color: var(--accent); }
	.skills-list { display: flex; flex-direction: column; gap: 0.25rem; }
	.skill-row { display: flex; justify-content: space-between; align-items: center; }
	.sn { font-size: 0.66rem; color: var(--text-2); }
	.sd { display: flex; gap: 2.5px; }
	.dot { width: 5.5px; height: 5.5px; border-radius: 50%; background: var(--border); }
	.dot.filled { background: var(--accent); }
	.qa { display: flex; align-items: center; gap: 0.45rem; padding: 0.35rem; border-radius: 0.3rem; text-decoration: none; color: inherit; transition: background 80ms ease; }
	.qa:hover { background: var(--accent-soft); }
	.qa :global(svg) { font-size: 0.9rem; color: var(--accent); flex-shrink: 0; }
	.qa-l { display: block; font-size: 0.7rem; font-weight: 600; }
	.qa-d { display: block; font-size: 0.58rem; color: var(--text-3); }
</style>
