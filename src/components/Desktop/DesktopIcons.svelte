<script lang="ts">
	import { apps } from '🍎/state/apps.svelte';
	
	const desktopIcons = [
		{ id: 'camera', label: 'Camera', icon: '/app-icons/camera/256.webp' },
		{ id: 'gallery', label: 'Gallery', icon: '/app-icons/gallery/256.webp' },
	];

	let selectedIcon = $state('');

	function handleDblClick(id: string) {
		apps.open[id as keyof typeof apps.open] = true;
		apps.active = id as keyof typeof apps.open;
		selectedIcon = '';
	}
</script>

<div class="desktop-icons-grid" on:click={() => (selectedIcon = '')}>
	{#each desktopIcons as icon}
		<div 
			class="desktop-icon" 
			class:selected={selectedIcon === icon.id}
			on:click|stopPropagation={() => (selectedIcon = icon.id)}
			on:dblclick|stopPropagation={() => handleDblClick(icon.id)}
		>
			<img src={icon.icon} alt={icon.label} />
			<span class="icon-label">{icon.label}</span>
		</div>
	{/each}
</div>

<style>
	.desktop-icons-grid {
		position: absolute;
		top: 1.5rem; /* Below topbar */
		right: 1rem;
		bottom: 5rem; /* Above dock */
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1rem;
		pointer-events: auto;
		z-index: 10;
		/* Align to top right */
		align-items: flex-end;
	}

	.desktop-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 72px;
		cursor: pointer;
		border-radius: 0.35rem;
		padding: 0.2rem;
		gap: 0.3rem;
		user-select: none;
	}

	.desktop-icon img {
		width: 60px;
		height: 60px;
		object-fit: contain;
		filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
	}

	.icon-label {
		color: white;
		font-size: 0.75rem;
		text-shadow: 0 1px 2px rgba(0,0,0,0.8);
		font-weight: 500;
		text-align: center;
		padding: 0.1rem 0.4rem;
		border-radius: 0.25rem;
		line-height: 1.2;
		word-break: break-word;
	}

	.desktop-icon.selected .icon-label {
		background: rgba(0, 100, 255, 0.6);
	}
	
	.desktop-icon.selected img {
		filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) brightness(0.8);
	}
</style>
