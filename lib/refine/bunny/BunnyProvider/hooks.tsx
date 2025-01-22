import { useAtomValue } from 'jotai'
import { bunnyAtom } from './atom'
export const useBunny = () => {
	const bunnyAtomValue = useAtomValue(bunnyAtom)
	return bunnyAtomValue
}
