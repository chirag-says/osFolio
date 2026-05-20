<script lang="ts">
	import AppleIcon from '~icons/mdi/apple';
	import { click_outside, elevation, focus_outside } from '🍎/actions';
	import { menubar_state } from '🍎/state/menubar.svelte';
	import Menu from './Menu.svelte';

	let appleClickCount = $state(0);
	let showConfetti = $state(false);
	let clickTimer: ReturnType<typeof setTimeout>;

	function handleAppleClick() {
		menubar_state.active = 'apple';
		appleClickCount++;
		
		clearTimeout(clickTimer);
		clickTimer = setTimeout(() => { appleClickCount = 0; }, 2000);

		if (appleClickCount >= 5) {
			appleClickCount = 0;
			triggerConfetti();
		}
	}

	function triggerConfetti() {
		showConfetti = true;
		setTimeout(() => { showConfetti = false; }, 3000);
	}
</script>

<div
	class="container"
	use:click_outside={() => (menubar_state.active = '')}
	use:focus_outside={() => (menubar_state.active = '')}
>
	{#each Object.entries(menubar_state.menus) as [menuID, menuConfig]}
		<div>
			<div style:height="100%">
				<button
					class="menu-button"
					class:default-menu={menuID === 'default'}
					class:apple-icon-button={menuID === 'apple'}
					style:--scale={menubar_state.active === menuID ? 1 : 0}
					onclick={() => menuID === 'apple' ? handleAppleClick() : (menubar_state.active = menuID)}
					onmouseover={() => menubar_state.active && (menubar_state.active = menuID)}
					onfocus={() => (menubar_state.active = menuID)}
				>
					{#if menuID === 'apple'}
						<AppleIcon />
					{:else}
						{menuConfig.title}
					{/if}
				</button>
			</div>

			<div
				class="menu-parent"
				style:visibility={menubar_state.active === menuID ? 'visible' : 'hidden'}
				use:elevation={'menubar-menu-parent'}
			>
				<Menu menu={menuConfig.menu} />
			</div>
		</div>
	{/each}
</div>

{#if showConfetti}
	<div class="confetti-container">
		{#each Array(50) as _, i}
			<div
				class="confetti-piece"
				style:--x="{Math.random() * 100}vw"
				style:--delay="{Math.random() * 0.5}s"
				style:--speed="{1.5 + Math.random() * 2}s"
				style:--color="hsl({Math.random() * 360}, 80%, 60%)"
				style:--size="{6 + Math.random() * 6}px"
				style:--drift="{(Math.random() - 0.5) * 200}px"
			></div>
		{/each}
	</div>
{/if}

<style>
	.container {
		height: 100%;

		display: flex;
		position: relative;
	}

	.menu-parent {
		position: absolute;
		margin-top: 1.5px;
	}

	.menu-button {
		font-weight: 500;

		border-radius: 0.25rem;

		position: relative;
		z-index: 1;

		padding: 0 0.5rem;

		height: 100%;

		&.default-menu {
			font-weight: 600 !important;
			margin: 0 6px;
		}

		&::after {
			content: '';

			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;

			height: 100%;
			width: 100%;

			border-radius: inherit;

			transform: scale(var(--scale), var(--scale));
			transform-origin: center center;

			transition: transform 100ms ease;

			background-color: hsla(var(--system-color-dark-hsl), 0.2);
		}
	}

	.apple-icon-button {
		margin: 0 0rem 0 0.5rem;
		padding: 0 0.7rem;

		display: block;

		:global(svg) {
			font-size: 1rem;
		}
	}

	/* Confetti */
	.confetti-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 99999;
		overflow: hidden;
	}

	.confetti-piece {
		position: absolute;
		top: -10px;
		left: var(--x);
		width: var(--size);
		height: var(--size);
		background: var(--color);
		border-radius: 2px;
		animation: confetti-fall var(--speed) ease-in var(--delay) forwards;
		opacity: 0;
	}

	@keyframes confetti-fall {
		0% {
			opacity: 1;
			transform: translateY(0) translateX(0) rotate(0deg);
		}
		100% {
			opacity: 0;
			transform: translateY(100vh) translateX(var(--drift)) rotate(720deg);
		}
	}
</style>
