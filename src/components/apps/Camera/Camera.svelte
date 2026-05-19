<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { preferences } from '🍎/state/preferences.svelte';

	let videoElement = $state<HTMLVideoElement | null>(null);
	let mediaStream = $state<MediaStream | null>(null);
	let errorMsg = $state('');
	let isLoading = $state(true);

	$effect(() => {
		if (videoElement && mediaStream) {
			videoElement.srcObject = mediaStream;
			videoElement.play().catch(console.error);
		}
	});

	async function startCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ 
				video: { 
					facingMode: 'user',
					width: { ideal: 1280 },
					height: { ideal: 720 }
				} 
			});
			mediaStream = stream;
		} catch (err: any) {
			console.error("Error accessing camera:", err);
			if (err.name === 'NotAllowedError') {
				errorMsg = 'Camera access denied. Please allow permissions.';
			} else if (err.name === 'NotFoundError') {
				errorMsg = 'No camera device found.';
			} else {
				errorMsg = 'Failed to access camera: ' + err.message;
			}
		} finally {
			isLoading = false;
		}
	}

	function stopCamera() {
		if (mediaStream) {
			mediaStream.getTracks().forEach(track => track.stop());
			mediaStream = null;
		}
	}

	onMount(() => {
		startCamera();
	});

	onDestroy(() => {
		stopCamera();
	});
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<!-- Invisible drag handle at the top -->
	<div class="app-window-drag-handle drag-area"></div>
	
	<div class="content">
		{#if isLoading}
			<div class="status-msg app-window-drag-handle">
				<div class="spinner"></div>
				<p>Starting Camera...</p>
			</div>
		{:else if errorMsg}
			<div class="status-msg error app-window-drag-handle">
				<div class="icon-placeholder">⚠️</div>
				<p>{errorMsg}</p>
			</div>
		{:else}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video 
				bind:this={videoElement} 
				autoplay 
				playsinline 
				muted
				class="app-window-drag-handle"
			></video>
		{/if}
	</div>
</section>

<style>
	.container {
		height: 100%;
		width: 100%;
		background: #000;
		color: #fff;
		border-radius: inherit;
		overflow: hidden;
		position: relative;
	}

	.drag-area {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3rem;
		z-index: 5;
		cursor: default;
	}

	.content {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		position: relative;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* Mirrors the video */
		transform: scaleX(-1);
		/* Allows dragging by clicking anywhere on the video */
		cursor: default;
	}

	.status-msg {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		text-align: center;
		padding: 2rem;
		color: #aaa;
		font-size: 0.95rem;
		font-weight: 500;
		width: 100%;
		height: 100%;
		cursor: default;
	}

	.error {
		color: #ff6b6b;
	}

	.icon-placeholder {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.spinner {
		width: 36px;
		height: 36px;
		border: 3px solid rgba(255,255,255,0.1);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
