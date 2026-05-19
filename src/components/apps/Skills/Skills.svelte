<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import IconCode from '~icons/ph/brackets-curly';
	import IconBrowser from '~icons/ph/browser';
	import IconGear from '~icons/ph/gear-six';
	import IconCloud from '~icons/ph/cloud';
	import IconCpu from '~icons/ph/cpu';
	import IconWrench from '~icons/ph/wrench';
	import IconStack from '~icons/ph/stack';
	import IconRocket from '~icons/ph/rocket-launch';
	import IconStar from '~icons/ph/star';
	import IconTrendUp from '~icons/ph/trend-up';

	// Brand logos
	import SiJavascript from '~icons/simple-icons/javascript';
	import SiTypescript from '~icons/simple-icons/typescript';
	import SiPython from '~icons/simple-icons/python';
	import SiGo from '~icons/simple-icons/go';
	import SiJava from '~icons/simple-icons/oracle';
	import SiCplusplus from '~icons/simple-icons/cplusplus';
	import SiPostgresql from '~icons/simple-icons/postgresql';
	import SiReact from '~icons/simple-icons/react';
	import SiNextdotjs from '~icons/simple-icons/nextdotjs';
	import SiSvelte from '~icons/simple-icons/svelte';
	import SiTailwindcss from '~icons/simple-icons/tailwindcss';
	import SiFramer from '~icons/simple-icons/framer';
	import SiNodedotjs from '~icons/simple-icons/nodedotjs';
	import SiExpress from '~icons/simple-icons/express';
	import SiFastapi from '~icons/simple-icons/fastapi';
	import SiFlask from '~icons/simple-icons/flask';
	import SiSocketdotio from '~icons/simple-icons/socketdotio';
	import SiGraphql from '~icons/simple-icons/graphql';
	import SiMongodb from '~icons/simple-icons/mongodb';
	import SiSupabase from '~icons/simple-icons/supabase';
	import SiSqlite from '~icons/simple-icons/sqlite';
	import SiRedis from '~icons/simple-icons/redis';
	import SiAmazonwebservices from '~icons/simple-icons/amazonwebservices';
	import SiTensorflow from '~icons/simple-icons/tensorflow';
	import SiOpencv from '~icons/simple-icons/opencv';
	import SiScikitlearn from '~icons/simple-icons/scikitlearn';
	import SiGooglegemini from '~icons/simple-icons/googlegemini';
	import SiDocker from '~icons/simple-icons/docker';
	import SiNginx from '~icons/simple-icons/nginx';
	import SiGit from '~icons/simple-icons/git';
	import SiGithubactions from '~icons/simple-icons/githubactions';
	import SiVercel from '~icons/simple-icons/vercel';
	import SiLinux from '~icons/simple-icons/linux';

	type Skill = { name: string; icon: any; color: string; level: number; label: string };
	type Category = { title: string; icon: any; skills: Skill[] };

	function lvl(n: number): string { return n >= 5 ? 'Expert' : n >= 4 ? 'Advanced' : n >= 3 ? 'Intermediate' : 'Beginner'; }
	function dots(n: number) { return Array.from({ length: 5 }, (_, i) => i < n); }

	const skillCategories: Category[] = [
		{ title: 'Languages', icon: IconCode, skills: [
			{ name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 5, label: lvl(5) },
			{ name: 'TypeScript', icon: SiTypescript, color: '#3178c6', level: 5, label: lvl(5) },
			{ name: 'Python', icon: SiPython, color: '#3776ab', level: 4, label: lvl(4) },
			{ name: 'Go', icon: SiGo, color: '#00add8', level: 3, label: lvl(3) },
			{ name: 'Java', icon: SiJava, color: '#ed8b00', level: 3, label: lvl(3) },
			{ name: 'C++', icon: SiCplusplus, color: '#00599c', level: 3, label: lvl(3) },
			{ name: 'SQL', icon: SiPostgresql, color: '#336791', level: 4, label: lvl(4) },
		]},
		{ title: 'Frontend', icon: IconBrowser, skills: [
			{ name: 'React', icon: SiReact, color: '#61dafb', level: 5, label: lvl(5) },
			{ name: 'Next.js', icon: SiNextdotjs, color: '#000', level: 5, label: lvl(5) },
			{ name: 'React Native', icon: SiReact, color: '#61dafb', level: 4, label: lvl(4) },
			{ name: 'Svelte', icon: SiSvelte, color: '#ff3e00', level: 3, label: lvl(3) },
			{ name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4', level: 5, label: lvl(5) },
			{ name: 'Framer Motion', icon: SiFramer, color: '#0055ff', level: 4, label: lvl(4) },
		]},
		{ title: 'Backend', icon: IconGear, skills: [
			{ name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 5, label: lvl(5) },
			{ name: 'Express.js', icon: SiExpress, color: '#333', level: 5, label: lvl(5) },
			{ name: 'FastAPI', icon: SiFastapi, color: '#009688', level: 4, label: lvl(4) },
			{ name: 'Flask', icon: SiFlask, color: '#333', level: 3, label: lvl(3) },
			{ name: 'Socket.IO', icon: SiSocketdotio, color: '#010101', level: 4, label: lvl(4) },
			{ name: 'GraphQL', icon: SiGraphql, color: '#e10098', level: 3, label: lvl(3) },
		]},
		{ title: 'Database & Cloud', icon: IconCloud, skills: [
			{ name: 'MongoDB', icon: SiMongodb, color: '#47a248', level: 5, label: lvl(5) },
			{ name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', level: 4, label: lvl(4) },
			{ name: 'Supabase', icon: SiSupabase, color: '#3ecf8e', level: 5, label: lvl(5) },
			{ name: 'SQLite', icon: SiSqlite, color: '#003b57', level: 4, label: lvl(4) },
			{ name: 'Redis', icon: SiRedis, color: '#dc382d', level: 3, label: lvl(3) },
			{ name: 'AWS', icon: SiAmazonwebservices, color: '#ff9900', level: 3, label: lvl(3) },
		]},
		{ title: 'AI / ML', icon: IconCpu, skills: [
			{ name: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00', level: 3, label: lvl(3) },
			{ name: 'YOLOv8', icon: SiOpencv, color: '#00d4aa', level: 4, label: lvl(4) },
			{ name: 'OpenCV', icon: SiOpencv, color: '#5c3ee8', level: 4, label: lvl(4) },
			{ name: 'scikit-learn', icon: SiScikitlearn, color: '#f7931e', level: 3, label: lvl(3) },
			{ name: 'Gemini / Grok', icon: SiGooglegemini, color: '#4285f4', level: 4, label: lvl(4) },
		]},
		{ title: 'DevOps & Tools', icon: IconWrench, skills: [
			{ name: 'Docker', icon: SiDocker, color: '#2496ed', level: 4, label: lvl(4) },
			{ name: 'Nginx', icon: SiNginx, color: '#009639', level: 4, label: lvl(4) },
			{ name: 'Git / GitHub', icon: SiGit, color: '#f05032', level: 5, label: lvl(5) },
			{ name: 'CI / CD', icon: SiGithubactions, color: '#2088ff', level: 3, label: lvl(3) },
			{ name: 'Vercel', icon: SiVercel, color: '#000', level: 4, label: lvl(4) },
			{ name: 'Linux', icon: SiLinux, color: '#fcc624', level: 4, label: lvl(4) },
		]},
	];
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<header class="titlebar app-window-drag-handle">
		<span class="titlebar-text">Skills</span>
	</header>

	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sb-icon-box"><IconCode /></div>
		<h2 class="sb-title">Tech Stack</h2>
		<p class="sb-sub">Technologies across 15+ production projects</p>

		<div class="stats-grid">
			<div class="stat"><span class="stat-icon"><IconStack /></span><span class="stat-num">25+</span><span class="stat-label">Technologies</span></div>
			<div class="stat"><span class="stat-icon"><IconRocket /></span><span class="stat-num">15+</span><span class="stat-label">Projects</span></div>
			<div class="stat"><span class="stat-icon"><IconStar /></span><span class="stat-num">5+</span><span class="stat-label">Years Learning</span></div>
			<div class="stat"><span class="stat-icon"><IconTrendUp /></span><span class="stat-num">Always</span><span class="stat-label">Improving</span></div>
		</div>
	</aside>

	<!-- Main -->
	<section class="main">
		<div class="main-header">
			<h1>All Skills</h1>
			<p class="main-sub">Organized by category</p>
		</div>

		<div class="cat-grid">
			{#each skillCategories as cat}
				<div class="cat-card">
					<div class="cat-head">
						<span class="cat-icon"><svelte:component this={cat.icon} /></span>
						<span class="cat-title">{cat.title}</span>
						<span class="cat-count">{cat.skills.length}</span>
					</div>
					<div class="skill-rows">
						{#each cat.skills as skill}
							<div class="skill-row">
								<span class="sk-avatar" style:color={skill.color}><svelte:component this={skill.icon} /></span>
								<span class="sk-name">{skill.name}</span>
								<div class="sk-dots">{#each dots(skill.level) as filled}<span class="dot" class:filled></span>{/each}</div>
								<span class="sk-label">{skill.label}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="bottom-bar">
			<div class="bb-left">
				<IconStar />
				<div>
					<span class="bb-title">Proficient across the modern tech ecosystem</span>
					<span class="bb-desc">From frontend to cloud, AI to DevOps — building scalable, performant, and delightful products.</span>
				</div>
			</div>
		</div>
	</section>
</section>

<style>
	.container {
		--accent: #6c5ce7; --accent-soft: rgba(108,92,231,0.08);
		--bg: #fff; --sidebar-bg: #f9f9fb; --border: rgba(0,0,0,0.07);
		--card-bg: #fff; --card-border: rgba(0,0,0,0.06);
		--text-1: #1a1a2e; --text-2: #6b7280; --text-3: #9ca3af;
		display: grid; grid-template-columns: 13rem 1fr; grid-template-rows: 2.5rem 1fr;
		border-radius: inherit; height: 100%; overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
		-webkit-font-smoothing: antialiased; color: var(--text-1); background: var(--bg);
	}
	.container.dark {
		--bg: #1a1a2e; --sidebar-bg: #16162b; --border: rgba(255,255,255,0.06);
		--card-bg: rgba(255,255,255,0.04); --card-border: rgba(255,255,255,0.06);
		--text-1: #e8e8f0; --text-2: #8b8ba0; --text-3: #5e5e78;
	}

	.titlebar {
		grid-area: 1/1/span 1/span 2; display: flex; justify-content: center; align-items: center;
		z-index: 2; user-select: none; border-bottom: 0.5px solid var(--border);
		border-top-left-radius: inherit; border-top-right-radius: inherit;
	}
	.titlebar-text { font-size: 0.8125rem; font-weight: 600; }

	/* Sidebar */
	.sidebar {
		grid-area: 2/1/span 1/span 1; background: var(--sidebar-bg);
		border-right: 0.5px solid var(--border); padding: 1.25rem 0.85rem;
		overflow-y: auto; border-bottom-left-radius: inherit;
	}
	.sb-icon-box {
		width: 36px; height: 36px; border-radius: 0.5rem; background: var(--accent-soft);
		display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;
	}
	.sb-icon-box :global(svg) { font-size: 1.1rem; color: var(--accent); }
	.sb-title { font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; }
	.sb-sub { font-size: 0.7rem; color: var(--text-3); margin-top: 0.15rem; line-height: 1.4; }

	.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin-top: 1.25rem; }
	.stat {
		background: var(--card-bg); border: 0.5px solid var(--card-border);
		border-radius: 0.45rem; padding: 0.5rem; text-align: center;
	}
	.stat-icon { display: block; margin-bottom: 0.15rem; }
	.stat-icon :global(svg) { font-size: 0.85rem; color: var(--accent); }
	.stat-num { display: block; font-size: 0.82rem; font-weight: 700; }
	.stat-label { display: block; font-size: 0.55rem; color: var(--text-3); }

	/* Main */
	.main {
		grid-area: 2/2/span 1/span 1; overflow-y: auto; padding: 1rem 1.25rem;
		border-bottom-right-radius: inherit;
	}
	.main-header { margin-bottom: 0.75rem; }
	.main-header h1 { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; }
	.main-sub { font-size: 0.72rem; color: var(--text-3); margin-top: 0.05rem; }

	.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; }

	.cat-card {
		background: var(--card-bg); border: 0.5px solid var(--card-border);
		border-radius: 0.55rem; padding: 0.65rem;
	}
	.cat-head { display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.5rem; padding-bottom: 0.4rem; border-bottom: 0.5px solid var(--border); }
	.cat-icon :global(svg) { font-size: 0.9rem; color: var(--accent); }
	.cat-title { flex: 1; font-size: 0.75rem; font-weight: 700; }
	.cat-count { font-size: 0.58rem; color: var(--text-3); background: var(--accent-soft); padding: 0.08rem 0.3rem; border-radius: 50px; font-weight: 600; }

	.skill-rows { display: flex; flex-direction: column; gap: 0.25rem; }
	.skill-row { display: flex; align-items: center; gap: 0.35rem; }
	.sk-avatar {
		width: 20px; height: 20px; display: flex;
		align-items: center; justify-content: center; flex-shrink: 0;
	}
	.sk-avatar :global(svg) { font-size: 0.9rem; }
	.sk-name { flex: 1; font-size: 0.68rem; font-weight: 500; }
	.sk-dots { display: flex; gap: 2px; }
	.dot { width: 5px; height: 5px; border-radius: 50%; background: var(--border); }
	.dot.filled { background: var(--accent); }
	.sk-label { font-size: 0.52rem; color: var(--text-3); min-width: 3.5rem; text-align: right; }

	.bottom-bar {
		margin-top: 0.65rem; display: flex; align-items: center; justify-content: space-between;
		padding: 0.6rem 0.75rem; border-radius: 0.5rem; background: var(--sidebar-bg);
		border: 0.5px solid var(--border);
	}
	.bb-left { display: flex; align-items: center; gap: 0.45rem; }
	.bb-left :global(svg) { font-size: 1rem; color: var(--accent); flex-shrink: 0; }
	.bb-title { display: block; font-size: 0.72rem; font-weight: 600; }
	.bb-desc { display: block; font-size: 0.6rem; color: var(--text-3); margin-top: 0.05rem; }
</style>
