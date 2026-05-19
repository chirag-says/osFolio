<script lang="ts">
	import { projects, categories, type Project } from './projects-data';
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import IconFolder from '~icons/ph/folder-notch';
	import IconRocket from '~icons/ph/rocket-launch';
	import IconCpu from '~icons/ph/cpu';
	import IconDevice from '~icons/ph/device-mobile';
	import IconPlant from '~icons/ph/plant';
	import IconCloud from '~icons/ph/cloud';
	import IconGlobe from '~icons/ph/globe';
	import IconGithub from '~icons/ph/github-logo';
	import IconWrench from '~icons/ph/wrench';

	let activeCategory = $state('all');
	let selectedProject = $state<Project | null>(null);
	let searchQuery = $state('');

	const filteredProjects = $derived(() => {
		let list = activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q)));
		}
		return list;
	});

	const categoryIcons: Record<string, any> = {
		all: IconFolder, production: IconRocket, 'ai-ml': IconCpu,
		mobile: IconDevice, iot: IconPlant, saas: IconCloud,
	};

	const statusCounts = $derived({
		live: projects.filter(p => p.status === 'live').length,
		'in-progress': projects.filter(p => p.status === 'in-progress').length,
		complete: projects.filter(p => p.status === 'complete').length,
	});

	// Collect all unique tech tags with counts
	const tagCounts = $derived(() => {
		const map = new Map<string, number>();
		projects.forEach(p => p.tech.forEach(t => map.set(t, (map.get(t) || 0) + 1)));
		return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
	});

	function initials(name: string) {
		return name.split(/[\s\/]+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
	}

	const avatarColors: Record<string, string> = {
		production: '#6c5ce7', 'ai-ml': '#e17055', mobile: '#00b894', iot: '#fdcb6e', saas: '#0984e3',
	};

	function avatarColor(cat: string) { return avatarColors[cat] || '#6c5ce7'; }

	function statusColor(s: string) {
		if (s === 'live') return '#34c759';
		if (s === 'complete') return '#007aff';
		return '#ff9500';
	}
	function statusBg(s: string) {
		if (s === 'live') return 'rgba(52,199,89,0.1)';
		if (s === 'complete') return 'rgba(0,122,255,0.1)';
		return 'rgba(255,149,0,0.1)';
	}
	function statusLabel(s: string) {
		if (s === 'live') return 'Live';
		if (s === 'complete') return 'Done';
		return 'WIP';
	}
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<header class="titlebar app-window-drag-handle">
		<span class="titlebar-text">Projects</span>
	</header>

	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sb-inner">
			<p class="sb-label">Projects</p>
			<nav>
				{#each categories as cat}
					<button class="sb-item" class:active={activeCategory === cat.id && !selectedProject} onclick={() => { activeCategory = cat.id; selectedProject = null; }}>
						<span class="sb-icon"><svelte:component this={categoryIcons[cat.id] || IconFolder} /></span>
						<span class="sb-text">{cat.label}</span>
						<span class="sb-count">{cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}</span>
					</button>
				{/each}
			</nav>

			<p class="sb-label" style="margin-top: 1rem;">Views</p>
			<div class="views-list">
				<div class="view-row"><span class="view-dot" style:background="#34c759"></span> Live <span class="sb-count">{statusCounts.live}</span></div>
				<div class="view-row"><span class="view-dot" style:background="#007aff"></span> In Progress <span class="sb-count">{statusCounts['in-progress']}</span></div>
				<div class="view-row"><span class="view-dot" style:background="#ff9500"></span> Completed <span class="sb-count">{statusCounts.complete}</span></div>
			</div>

			<p class="sb-label" style="margin-top: 1rem;">Tags</p>
			<div class="tags-wrap">
				{#each tagCounts() as [tag, count]}
					<span class="tag-pill">{tag} <span class="tag-count">{count}</span></span>
				{/each}
			</div>
		</div>
	</aside>

	<!-- Main -->
	<section class="main">
		{#if selectedProject}
			<button class="back-btn" onclick={() => (selectedProject = null)}>
				<span class="back-chev">‹</span> All Projects
			</button>
			<div class="detail-hero">
				<span class="avatar lg" style:background={avatarColor(selectedProject.category)}>{initials(selectedProject.name)}</span>
				<div>
					<h1 class="detail-name">{selectedProject.name}</h1>
					<p class="detail-tagline">{selectedProject.tagline}</p>
				</div>
				<span class="status-badge" style:color={statusColor(selectedProject.status)} style:background={statusBg(selectedProject.status)}>{statusLabel(selectedProject.status)}</span>
			</div>
			<div class="detail-pills">{#each selectedProject.tech as t}<span class="tech-pill">{t}</span>{/each}</div>
			<div class="detail-divider"></div>
			<p class="detail-desc">{selectedProject.description}</p>
			<div class="detail-divider"></div>
			<h3 class="detail-heading">Key Highlights</h3>
			<ul class="detail-list">{#each selectedProject.highlights as h}<li>{h}</li>{/each}</ul>
			{#if selectedProject.metrics}
				<div class="detail-divider"></div>
				<h3 class="detail-heading">Metrics</h3>
				<div class="metrics-wrap">{#each selectedProject.metrics as m}<span class="metric-pill">{m}</span>{/each}</div>
			{/if}
			{#if selectedProject.liveUrl || selectedProject.githubUrl}
				<div class="detail-divider"></div>
				<div class="detail-links">
					{#if selectedProject.liveUrl}<a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" class="d-link primary"><IconGlobe /> Live Site</a>{/if}
					{#if selectedProject.githubUrl}<a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" class="d-link"><IconGithub /> GitHub</a>{/if}
				</div>
			{/if}
		{:else}
			<!-- Header -->
			<div class="main-header">
				<div>
					<h1 class="main-title">All Projects</h1>
					<p class="main-sub">{filteredProjects().length} projects in total</p>
				</div>
				<input class="search-input" type="text" placeholder="Search projects..." bind:value={searchQuery} />
			</div>

			<!-- Grid -->
			<div class="grid">
				{#each filteredProjects() as project (project.id)}
					<button class="card" onclick={() => (selectedProject = project)}>
						<div class="card-head">
							<span class="avatar" style:background={avatarColor(project.category)}>{initials(project.name)}</span>
							<span class="card-name">{project.name}</span>
							<span class="status-badge sm" style:color={statusColor(project.status)} style:background={statusBg(project.status)}>{statusLabel(project.status)}</span>
						</div>
						<p class="card-desc">{project.tagline}</p>
						<div class="card-techs">
							{#each project.tech.slice(0, 3) as t}<span class="tech-pill sm">{t}</span>{/each}
							{#if project.tech.length > 3}<span class="tech-pill sm muted">+{project.tech.length - 3}</span>{/if}
						</div>
						<div class="card-footer">
							{#if project.liveUrl}<span class="cf-link"><IconGlobe /> Live Demo</span>{/if}
							<span class="cf-link"><IconGithub /> GitHub</span>
						</div>
					</button>
				{/each}
			</div>

			<div class="grid-footer">
				<span>Showing {filteredProjects().length} of {projects.length} projects</span>
			</div>
		{/if}
	</section>
</section>

<style>
	.container {
		--accent: #6c5ce7; --accent-soft: rgba(108,92,231,0.08);
		--bg: #fff; --sidebar-bg: #f9f9fb; --border: rgba(0,0,0,0.07);
		--card-bg: #fff; --card-border: rgba(0,0,0,0.08); --card-hover: rgba(0,0,0,0.02);
		--text-1: #1a1a2e; --text-2: #6b7280; --text-3: #9ca3af;
		display: grid; grid-template-columns: 11rem 1fr; grid-template-rows: 2.5rem 1fr;
		border-radius: inherit; height: 100%; overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
		-webkit-font-smoothing: antialiased; color: var(--text-1); background: var(--bg);
	}
	.container.dark {
		--bg: #1a1a2e; --sidebar-bg: #16162b; --border: rgba(255,255,255,0.06);
		--card-bg: rgba(255,255,255,0.04); --card-border: rgba(255,255,255,0.08);
		--card-hover: rgba(255,255,255,0.06);
		--text-1: #e8e8f0; --text-2: #8b8ba0; --text-3: #5e5e78;
	}

	.titlebar {
		grid-area: 1/1/span 1/span 2; display: flex; justify-content: center; align-items: center;
		z-index: 2; user-select: none; border-bottom: 0.5px solid var(--border);
		border-top-left-radius: inherit; border-top-right-radius: inherit; position: relative;
	}
	.titlebar-text { font-size: 0.8125rem; font-weight: 600; }

	/* Sidebar */
	.sidebar {
		grid-area: 2/1/span 1/span 1; background: var(--sidebar-bg);
		border-right: 0.5px solid var(--border); overflow-y: auto;
		border-bottom-left-radius: inherit;
	}
	.sb-inner { padding: 0.6rem 0.45rem; }
	.sb-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); padding: 0.15rem 0.5rem; margin-bottom: 0.25rem; }
	nav { display: flex; flex-direction: column; gap: 1px; }
	.sb-item {
		display: flex; align-items: center; justify-content: flex-start; gap: 0.35rem; width: 100%;
		padding: 0.35rem 0.5rem; border-radius: 0.3rem; border: none;
		background: transparent; cursor: pointer; font-size: 0.76rem;
		color: var(--text-2); text-align: left; font-weight: 500; transition: all 80ms ease;
	}
	.sb-item :global(svg) { font-size: 0.85rem; }
	.sb-item:hover { background: var(--accent-soft); color: var(--accent); }
	.sb-item.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
	.sb-item.active :global(svg) { color: var(--accent); }
	.sb-icon { display: flex; align-items: center; width: 1rem; }
	.sb-icon :global(svg) { color: var(--accent); }
	.sb-text { flex: 1; }
	.sb-count { font-size: 0.6rem; color: var(--text-3); font-variant-numeric: tabular-nums; }
	.sb-item.active .sb-count { color: var(--accent); opacity: 0.7; }

	.views-list { display: flex; flex-direction: column; gap: 0.2rem; padding: 0 0.5rem; }
	.view-row { display: flex; align-items: center; gap: 0.35rem; font-size: 0.72rem; color: var(--text-2); padding: 0.15rem 0; }
	.view-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
	.view-row .sb-count { margin-left: auto; }

	.tags-wrap { display: flex; flex-wrap: wrap; gap: 0.25rem; padding: 0 0.4rem; }
	.tag-pill { font-size: 0.6rem; padding: 0.12rem 0.35rem; border-radius: 3px; background: var(--accent-soft); color: var(--accent); font-weight: 500; display: flex; align-items: center; gap: 0.2rem; }
	.tag-count { font-size: 0.52rem; opacity: 0.6; }

	/* Main */
	.main {
		grid-area: 2/2/span 1/span 1; overflow-y: auto; padding: 1rem 1.25rem;
		border-bottom-right-radius: inherit; background: var(--bg);
	}

	.main-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; gap: 1rem; }
	.main-title { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
	.main-sub { font-size: 0.72rem; color: var(--text-3); margin-top: 0.1rem; }
	.search-input {
		font-size: 0.72rem; padding: 0.35rem 0.6rem; border-radius: 0.35rem;
		border: 0.5px solid var(--border); background: var(--sidebar-bg);
		color: var(--text-1); outline: none; width: 10rem;
	}
	.search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-soft); }
	.search-input::placeholder { color: var(--text-3); }

	/* Grid */
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.6rem; }

	.card {
		background: var(--card-bg); border: 0.5px solid var(--card-border);
		border-radius: 0.6rem; padding: 0.85rem; cursor: pointer;
		transition: all 100ms ease; text-align: left;
		display: flex; flex-direction: column; gap: 0.4rem;
	}
	.card:hover { border-color: var(--accent); box-shadow: 0 2px 10px rgba(108,92,231,0.08); }

	.card-head { display: flex; align-items: center; gap: 0.4rem; }
	.avatar {
		width: 28px; height: 28px; border-radius: 0.4rem; display: flex;
		align-items: center; justify-content: center; font-size: 0.58rem;
		font-weight: 700; color: white; flex-shrink: 0; letter-spacing: 0.02em;
	}
	.avatar.lg { width: 40px; height: 40px; font-size: 0.78rem; border-radius: 0.5rem; }
	.card-name { flex: 1; font-size: 0.82rem; font-weight: 700; letter-spacing: -0.01em; }

	.status-badge {
		font-size: 0.55rem; padding: 0.12rem 0.4rem; border-radius: 50px;
		font-weight: 700; letter-spacing: 0.02em; white-space: nowrap; flex-shrink: 0;
	}
	.status-badge.sm { font-size: 0.5rem; padding: 0.08rem 0.32rem; }

	.card-desc { font-size: 0.72rem; color: var(--text-2); line-height: 1.4; }

	.card-techs { display: flex; flex-wrap: wrap; gap: 0.2rem; }
	.tech-pill { font-size: 0.6rem; padding: 0.1rem 0.35rem; border-radius: 3px; background: var(--sidebar-bg); color: var(--text-2); font-weight: 500; border: 0.5px solid var(--border); }
	.tech-pill.sm { font-size: 0.55rem; padding: 0.06rem 0.28rem; }
	.tech-pill.muted { opacity: 0.5; border: none; }

	.card-footer {
		display: flex; gap: 0.75rem; margin-top: 0.15rem;
		padding-top: 0.35rem; border-top: 0.5px solid var(--border);
	}
	.cf-link { display: flex; align-items: center; gap: 0.2rem; font-size: 0.6rem; color: var(--text-3); }
	.cf-link :global(svg) { font-size: 0.72rem; }

	.grid-footer { margin-top: 0.75rem; text-align: center; font-size: 0.65rem; color: var(--text-3); }

	/* Detail */
	.back-btn { background: none; border: none; color: var(--accent); cursor: pointer; font-size: 0.8rem; padding: 0; display: flex; align-items: center; gap: 0.1rem; margin-bottom: 0.75rem; }
	.back-chev { font-size: 1.1rem; }
	.detail-hero { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.65rem; }
	.detail-name { font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; }
	.detail-tagline { font-size: 0.8rem; color: var(--text-2); margin-top: 0.1rem; }
	.detail-pills { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.5rem; }
	.detail-divider { height: 0.5px; background: var(--border); margin: 0.6rem 0; }
	.detail-desc { font-size: 0.78rem; line-height: 1.6; color: var(--text-2); }
	.detail-heading { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); margin-bottom: 0.35rem; }
	.detail-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.2rem; }
	.detail-list li { font-size: 0.76rem; line-height: 1.5; color: var(--text-1); padding-left: 0.8rem; position: relative; }
	.detail-list li::before { content: '›'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
	.metrics-wrap { display: flex; flex-wrap: wrap; gap: 0.3rem; }
	.metric-pill { font-size: 0.7rem; padding: 0.2rem 0.55rem; border-radius: 4px; background: var(--accent-soft); color: var(--accent); font-weight: 600; }
	.detail-links { display: flex; gap: 0.5rem; }
	.d-link { display: flex; align-items: center; gap: 0.25rem; font-size: 0.78rem; padding: 0.35rem 0.75rem; border-radius: 0.35rem; text-decoration: none; font-weight: 500; background: var(--sidebar-bg); color: var(--text-1); border: 0.5px solid var(--border); transition: all 80ms ease; }
	.d-link:hover { border-color: var(--accent); color: var(--accent); }
	.d-link.primary { background: var(--accent); color: white; border-color: var(--accent); }
	.d-link.primary:hover { filter: brightness(0.9); }
	.d-link :global(svg) { font-size: 0.85rem; }
</style>
