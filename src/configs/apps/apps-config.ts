import { create_app_config } from '🍎/helpers/create-app-config.ts';

const wallpapers = create_app_config({
	title: 'Wallpapers',
	resizable: true,

	height: 600,
	width: 800,
});

const calculator = create_app_config({
	title: 'Calculator',

	expandable: true,
	resizable: false,

	height: 250 * 1.414,
	width: 250,
});

const calendar = create_app_config({
	title: 'Calendar',
	resizable: true,
});

const vscode = create_app_config({
	title: 'VSCode',
	resizable: true,

	height: 600,
	width: 800,
});

const finder = create_app_config({
	title: 'Finder',
	resizable: true,

	// dockBreaksBefore: true,
	should_open_window: false,
});

const projects = create_app_config({
	title: 'Projects',
	resizable: true,

	height: 680,
	width: 1000,
});

const resume = create_app_config({
	title: 'Resume',
	resizable: true,

	height: 650,
	width: 960,
});

const terminal = create_app_config({
	title: 'Terminal',
	resizable: true,

	height: 450,
	width: 650,
});

const skills = create_app_config({
	title: 'Skills',
	resizable: true,

	height: 680,
	width: 1020,
});

const contact = create_app_config({
	title: 'Contact',
	resizable: true,

	height: 550,
	width: 750,

	dock_breaks_before: true,
});

const aboutMe = create_app_config({
	title: `About Me`,
	resizable: true,

	dock_breaks_before: true,

	height: 600,
	width: 800,
});

const viewSource = create_app_config({
	title: `View Source`,
	resizable: true,

	should_open_window: false,
	external_action: () => window.open('https://github.com/chirag-says/osFolio', '_blank'),
});

const camera = create_app_config({
	title: 'Camera',
	resizable: true,
	height: 500,
	width: 600,
});

const gallery = create_app_config({
	title: 'Gallery',
	resizable: true,
	height: 600,
	width: 800,
});

export const apps_config = {
	finder,
	projects,
	resume,
	terminal,
	skills,
	calculator,
	calendar,
	wallpapers,

	'about-me': aboutMe,
	contact,
	camera,
	gallery,
	'view-source': viewSource,
};
