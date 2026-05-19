import type { apps_config } from '🍎/configs/apps/apps-config';

export type AppID = keyof typeof apps_config;

export const apps = $state({
	open: {
		finder: true,
		projects: false,
		resume: false,
		terminal: false,
		skills: false,
		calculator: false,
		calendar: false,
		wallpapers: false,
		'about-me': false,
		contact: false,
		camera: false,
		gallery: false,
		'view-source': false,
	} as Record<AppID, boolean>,

	active: 'finder' satisfies AppID,

	/**
	 * Maximum zIndex for the active app
	 * Initialize with -2, so that it becomes 0 when initialised
	 */
	active_z_index: -2,

	z_indices: {
		finder: 0,
		projects: 0,
		resume: 0,
		terminal: 0,
		skills: 0,
		calculator: 0,
		calendar: 0,
		wallpapers: 0,
		'about-me': 0,
		contact: 0,
		camera: 0,
		gallery: 0,
		'view-source': 0,
	} as Record<AppID, number>,

	is_being_dragged: false as boolean,

	fullscreen: {
		finder: false,
		projects: false,
		resume: false,
		terminal: false,
		skills: false,
		calculator: false,
		calendar: false,
		wallpapers: false,
		'about-me': false,
		contact: false,
		camera: false,
		gallery: false,
		'view-source': false,
	} as Record<AppID, boolean>,
});
