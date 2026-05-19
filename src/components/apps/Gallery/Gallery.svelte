<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte';
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<div class="app-window-drag-handle header">
		<span class="title">Gallery</span>
	</div>
	<div class="content">
		<div class="empty-state">
			<div class="icon">🖼️</div>
			<p>No photos yet.</p>
		</div>
	</div>
</section>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #ececec;
		color: #333;
		border-radius: inherit;
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.container.dark {
		background: #1e1e1e;
		color: #ccc;
	}

	.header {
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	
	.container.dark .header {
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}

	.title {
		font-size: 0.9rem;
		font-weight: 600;
	}

	.content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.empty-state {
		text-align: center;
		color: #888;
	}
	
	.icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}
</style>
