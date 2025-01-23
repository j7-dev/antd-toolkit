import { bunnyAtom, bunnyStore } from './atom'
export const useBunny = () => {
	const bunnyAtomValue = bunnyStore.get(bunnyAtom)
	return bunnyAtomValue
}
