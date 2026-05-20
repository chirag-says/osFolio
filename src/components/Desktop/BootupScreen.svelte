<script lang="ts">
	import { onMount } from 'svelte';
	import { quintInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { elevation } from '🍎/actions';
	import { fade_out } from '🍎/helpers/fade.ts';
	import { sleep } from '🍎/helpers/sleep';

	let hidden_splash_screen = $state(false);
	let progress_val = tweened(100, { duration: 3000, easing: quintInOut });
	let show_label = $state(false);

	onMount(async () => {
		await sleep(400);
		show_label = true;
		$progress_val = 0;
		await sleep(3000);
		hidden_splash_screen = true;
	});
</script>

{#if !(hidden_splash_screen || import.meta.env.DEV)}
	<div out:fade_out={{ duration: 500 }} class="splash-screen" use:elevation={'bootup-screen'}>
		<div class="logo-mark">
			<span class="logo-letter">C</span><span class="logo-letter accent">S</span>
		</div>
		{#if show_label}
			<p class="boot-label">Chirag OS</p>
		{/if}

		<div
			class="progress"
			role="progressbar"
			aria-valuenow={100 - $progress_val}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuetext="Initializing Chirag OS..."
		>
			<div class="indicator" style:translate="-{$progress_val}% 0"></div>
		</div>
	</div>
{/if}

<!-- iframe => firefox support: will always make sound available on start or F5 -->
{#if import.meta.env.PROD}
	<iframe id="audio" src="/sounds/mac-startup-sound.mp3" allow="autoplay" title="hello"></iframe>
{/if}

<style>
	.splash-screen {
		position: fixed;
		top: 0;
		bottom: 0;

		height: 100vh;
		width: 100vw;

		cursor: none;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;

		animation-fill-mode: forwards;

		background-color: #000;
	}

	.logo-mark {
		font-size: 4.5rem;
		font-weight: 200;
		font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
		color: white;
		letter-spacing: 4px;
		display: flex;
		gap: 2px;
		animation: fadeInUp 0.8s ease-out both;
	}

	.logo-letter {
		display: inline-block;
	}

	.logo-letter.accent {
		background: linear-gradient(135deg, #6c5ce7, #a29bfe);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.boot-label {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 3px;
		text-transform: uppercase;
		margin-top: -0.5rem;
		animation: fadeInUp 0.6s ease-out both;
	}

	.progress {
		border-radius: 50px;

		height: 4px;
		width: 150px;

		overflow-x: hidden;

		background-color: var(--system-color-grey-800);
	}

	.indicator {
		background-color: var(--system-color-grey-100);

		border-radius: inherit;

		width: 100%;
		height: 100%;

		transform: translateX(-0%);
	}

	#audio {
		position: absolute;
		z-index: -9999;

		display: none;
	}
</style>
