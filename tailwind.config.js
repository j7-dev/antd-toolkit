/** @type {import('tailwindcss').Config} */
export default {
	important: '#tw',
	prefix: 'at-',
	corePlugins: {
		preflight: false,
	},
	future: {
		disableColorOpacityUtilitiesByDefault: true,
		respectDefaultRingColorOpacity: true,
	},
	colorSpace: 'srgb',
	content: ['./lib/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			animation: {
				pulse: 'tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			colors: {
				primary: '#1677ff',
			},
			screens: {
				sm: '576px', // iphone SE
				md: '810px', // ipad Portrait
				lg: '1080px', // ipad Landscape
				xl: '1280px', // mac air
				xxl: '1440px',
			},
			keyframes: {
				'tw-pulse': {
					'50%': { opacity: '0.5' },
				},
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				'.right-to-left': {
					direction: 'rtl',
				},

				// 與 WordPress 衝突的 class
				'.tw-hidden': {
					display: 'none',
				},
				'.tw-columns-1': {
					columnCount: 1,
				},
				'.tw-columns-2': {
					columnCount: 2,
				},
				'.tw-fixed': {
					position: 'fixed',
				},
				'.tw-block': {
					display: 'block',
				},
				'.tw-inline': {
					display: 'inline',
				},
			}
			addUtilities(newUtilities, ['responsive', 'hover'])
		},
	],
	safelist: ['opacity-50'],
	blocklist: [
		'hidden',
		'columns-1',
		'columns-2',
		'fixed',
		'block',
		'inline',
	],
}
