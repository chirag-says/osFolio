<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import IconMail from '~icons/mdi/email';
	import IconPhone from '~icons/mdi/phone';
	import IconLinkedin from '~icons/mdi/linkedin';
	import IconGithub from '~icons/mdi/github';
	import IconDownload from '~icons/ph/download-simple';
	import IconArrowRight from '~icons/ph/caret-right';
	import IconHand from '~icons/ph/hand-waving';
	import IconSparkle from '~icons/ph/sparkle';

	const channels = [
		{ icon: IconMail, label: 'Email', value: 'chiragbaldia@gmail.com', href: 'mailto:chiragbaldia@gmail.com', color: '#6c5ce7' },
		{ icon: IconPhone, label: 'Phone', value: '+91 636-012-2696', href: 'tel:+916360122696', color: '#00b894' },
		{ icon: IconLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/chirag-baldia', href: 'https://www.linkedin.com/in/chirag-baldia', color: '#0984e3' },
		{ icon: IconGithub, label: 'GitHub', value: 'github.com/chirag-says', href: 'https://github.com/chirag-says', color: '#2d3436' },
	];
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<!-- Sidebar -->
	<aside class="sidebar">
		<p class="sb-label">Channels</p>
		<div class="channels">
			{#each channels as ch}
				<a href={ch.href} target="_blank" rel="noopener noreferrer" class="channel">
					<span class="ch-icon" style:background={ch.color}><svelte:component this={ch.icon} /></span>
					<div class="ch-info">
						<span class="ch-label">{ch.label}</span>
						<span class="ch-value">{ch.value}</span>
					</div>
				</a>
			{/each}
		</div>

		<div class="sidebar-cta">
			<span class="cta-icon"><IconSparkle /></span>
			<h3>Let's build something amazing together!</h3>
			<p>I'm always open to new opportunities and exciting collaborations.</p>
		</div>
	</aside>

	<!-- Main -->
	<section class="main">
		<div class="main-header app-window-drag-handle">
			<div>
				<h1 class="main-title">Contact</h1>
				<p class="main-sub">Let's start a conversation</p>
			</div>
		</div>

		<div class="hero-card">
			<div class="hero-wave"><IconHand /></div>
			<h2>Let's Connect</h2>
			<p class="hero-desc">
				I'm always open to opportunities, collaborations,
				or just a good conversation about technology.
			</p>

			<div class="actions">
				<a href="mailto:chiragbaldia@gmail.com" class="action-btn primary">
					<IconMail />
					<span>Send an Email</span>
					<IconArrowRight />
				</a>
				<a href="https://www.linkedin.com/in/chirag-baldia" target="_blank" rel="noopener noreferrer" class="action-btn">
					<IconLinkedin />
					<span>Connect on LinkedIn</span>
					<IconArrowRight />
				</a>
				<a href="/resume/Chirag_Resume.pdf" target="_blank" rel="noopener noreferrer" class="action-btn">
					<IconDownload />
					<span>Download Resume</span>
					<IconArrowRight />
				</a>
			</div>
		</div>

		<div class="status-bar">
			<div class="status-left">
				<span class="pulse-dot"></span>
				<div>
					<span class="status-title">Available for opportunities</span>
					<span class="status-desc">Open to internships, full-time roles, and freelance projects.</span>
				</div>
			</div>
			<span class="open-badge">Open to work</span>
		</div>
	</section>
</section>

<style>
	.container {
		--accent: #6c5ce7; --accent-soft: rgba(108,92,231,0.08);
		--bg: #fff; --sidebar-bg: #f9f9fb; --border: rgba(0,0,0,0.07);
		--text-1: #1a1a2e; --text-2: #6b7280; --text-3: #9ca3af;
		--card-bg: #faf9fe;
		display: grid; grid-template-columns: 14rem 1fr;
		border-radius: inherit; height: 100%; overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
		-webkit-font-smoothing: antialiased; color: var(--text-1); background: var(--bg);
	}
	.container.dark {
		--bg: #1a1a2e; --sidebar-bg: #16162b; --border: rgba(255,255,255,0.06);
		--text-1: #e8e8f0; --text-2: #8b8ba0; --text-3: #5e5e78;
		--card-bg: rgba(108,92,231,0.06);
	}

	/* Sidebar */
	.sidebar {
		background: var(--sidebar-bg); border-right: 0.5px solid var(--border);
		padding: 2.5rem 0.65rem 0.65rem; display: flex; flex-direction: column;
		overflow-y: auto; border-top-left-radius: inherit; border-bottom-left-radius: inherit;
	}
	.sb-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); padding: 0 0.25rem; margin-bottom: 0.5rem; }
	.channels { display: flex; flex-direction: column; gap: 0.15rem; }
	.channel {
		display: flex; align-items: center; gap: 0.55rem; padding: 0.5rem 0.35rem;
		border-radius: 0.4rem; text-decoration: none; color: inherit; transition: background 80ms ease;
	}
	.channel:hover { background: var(--accent-soft); }
	.ch-icon {
		width: 32px; height: 32px; border-radius: 0.45rem; display: flex;
		align-items: center; justify-content: center; flex-shrink: 0;
	}
	.ch-icon :global(svg) { font-size: 1rem; color: white; }
	.ch-label { display: block; font-size: 0.76rem; font-weight: 600; color: var(--text-1); }
	.ch-value { display: block; font-size: 0.6rem; color: var(--text-3); margin-top: 0.05rem; }

	.sidebar-cta {
		margin-top: auto; background: var(--card-bg); border-radius: 0.6rem;
		padding: 0.85rem; text-align: center; border: 0.5px solid var(--border);
	}
	.cta-icon { font-size: 1.5rem; color: var(--accent); display: block; margin-bottom: 0.3rem; }
	.cta-icon :global(svg) { color: var(--accent); }
	.sidebar-cta h3 { font-size: 0.78rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.25rem; }
	.sidebar-cta p { font-size: 0.65rem; color: var(--text-2); line-height: 1.45; }

	/* Main */
	.main {
		display: flex; flex-direction: column; padding: 1.25rem 1.5rem;
		overflow-y: auto; border-top-right-radius: inherit; border-bottom-right-radius: inherit;
	}
	.main-header { margin-bottom: 1rem; }
	.main-title { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; }
	.main-sub { font-size: 0.78rem; color: var(--text-3); margin-top: 0.1rem; }

	.hero-card {
		background: var(--card-bg); border: 0.5px solid var(--border);
		border-radius: 0.75rem; padding: 1.75rem 2rem; text-align: center;
		flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
	}
	.hero-wave { margin-bottom: 0.3rem; color: var(--accent); }
	.hero-wave :global(svg) { font-size: 2.5rem; }
	.hero-card h2 { font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; }
	.hero-desc { font-size: 0.82rem; color: var(--text-2); line-height: 1.55; margin: 0.4rem 0 1.25rem; max-width: 320px; }

	.actions { display: flex; flex-direction: column; gap: 0.4rem; width: 100%; max-width: 300px; }
	.action-btn {
		display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 0.85rem;
		border-radius: 0.5rem; text-decoration: none; font-size: 0.82rem; font-weight: 600;
		transition: all 100ms ease; background: var(--bg); color: var(--text-1);
		border: 0.5px solid var(--border);
	}
	.action-btn span { flex: 1; text-align: left; }
	.action-btn :global(svg) { font-size: 1rem; flex-shrink: 0; }
	.action-btn:last-child :global(svg:first-child) { color: var(--accent); }
	.action-btn:hover { border-color: var(--accent); box-shadow: 0 1px 6px rgba(108,92,231,0.1); }

	.action-btn.primary {
		background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: white; border: none;
		box-shadow: 0 2px 8px rgba(108,92,231,0.25);
	}
	.action-btn.primary :global(svg) { color: white; }
	.action-btn.primary:hover { filter: brightness(1.05); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(108,92,231,0.3); }

	.status-bar {
		margin-top: 0.85rem; display: flex; align-items: center; justify-content: space-between;
		padding: 0.6rem 0.85rem; border-radius: 0.5rem; background: var(--sidebar-bg);
		border: 0.5px solid var(--border); gap: 0.75rem;
	}
	.status-left { display: flex; align-items: center; gap: 0.5rem; }
	.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #34c759; flex-shrink: 0; animation: pulse 2s ease infinite; }
	@keyframes pulse { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52,199,89,0.4); } 50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(52,199,89,0); } }
	.status-title { display: block; font-size: 0.76rem; font-weight: 600; }
	.status-desc { display: block; font-size: 0.62rem; color: var(--text-3); margin-top: 0.05rem; }
	.open-badge { font-size: 0.62rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 50px; background: rgba(52,199,89,0.1); color: #34c759; white-space: nowrap; flex-shrink: 0; }
</style>
