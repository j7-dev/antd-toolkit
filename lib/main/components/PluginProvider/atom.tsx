import { atom, createStore } from 'jotai'

export const pluginStore = createStore()

export const pluginAtom = atom<{
	app_domain: string
}>({
	app_domain: '',
})
