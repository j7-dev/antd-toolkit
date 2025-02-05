import { useContext } from 'react'
import { BunnyContext } from './index'

export const useBunny = () => {
	const context = useContext(BunnyContext)
	return context
}
