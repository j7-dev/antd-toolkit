import { atom } from 'jotai'

export type TEnv = {
	SITE_URL: string
	AJAX_URL: string
	CURRENT_USER_ID: number
	CURRENT_POST_ID: string | false
	PERMALINK: string
	APP_NAME: string
	KEBAB: string
	SNAKE: string
	NONCE: string
	BUNNY_LIBRARY_ID?: string
	BUNNY_CDN_HOSTNAME?: string
	BUNNY_STREAM_API_KEY?: string
} & {
	[key: string]: any
}

export const pluginAtom = atom<TEnv>({
	SITE_URL: '',
	AJAX_URL: '',
	CURRENT_USER_ID: 0,
	CURRENT_POST_ID: false,
	PERMALINK: '',
	APP_NAME: '',
	KEBAB: '',
	SNAKE: '',
	NONCE: '',
})
