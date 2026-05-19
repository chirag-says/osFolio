<script lang="ts">
	import type { AppID } from '🍎/state/apps.svelte';

	const {
		app_id,
		is_being_dragged,
	}: {
		app_id: AppID;
		is_being_dragged: boolean;
	} = $props();
</script>

{#if app_id === 'calendar'}
	{#await import('./Calendar/Calendar.svelte') then { default: Calendar }}
		<Calendar />
	{/await}
{:else if app_id === 'vscode'}
	{#await import('./VSCode/VSCode.svelte') then { default: VSCode }}
		<VSCode {is_being_dragged} />
	{/await}
{:else if app_id === 'calculator'}
	{#await import('./Calculator/Calculator.svelte') then { default: Calculator }}
		<Calculator />
	{/await}
{:else if app_id === 'wallpapers'}
	{#await import('./WallpaperApp/WallpaperSelectorApp.svelte') then { default: WallpaperSelector }}
		<WallpaperSelector />
	{/await}
{:else if app_id === 'about-me'}
	{#await import('./AboutMe/AboutMe.svelte') then { default: AboutMe }}
		<AboutMe />
	{/await}
{:else if app_id === 'projects'}
	{#await import('./Projects/Projects.svelte') then { default: Projects }}
		<Projects />
	{/await}
{:else if app_id === 'resume'}
	{#await import('./Resume/Resume.svelte') then { default: Resume }}
		<Resume />
	{/await}
{:else if app_id === 'terminal'}
	{#await import('./Terminal/Terminal.svelte') then { default: Terminal }}
		<Terminal />
	{/await}
{:else if app_id === 'skills'}
	{#await import('./Skills/Skills.svelte') then { default: Skills }}
		<Skills />
	{/await}
{:else if app_id === 'contact'}
	{#await import('./Contact/Contact.svelte') then { default: Contact }}
		<Contact />
	{/await}
{:else if app_id === 'camera'}
	{#await import('./Camera/Camera.svelte') then { default: Camera }}
		<Camera />
	{/await}
{:else if app_id === 'gallery'}
	{#await import('./Gallery/Gallery.svelte') then { default: Gallery }}
		<Gallery />
	{/await}
{:else}
	{#await import('./AppStore/AppStore.svelte') then { default: AppStore }}
		<AppStore {app_id} />
	{/await}
{/if}
