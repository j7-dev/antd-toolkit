import { atom } from 'jotai'
import { THistoryDrawerProps } from './HistoryDrawer/types'
import { defaultHistoryDrawerProps } from './HistoryDrawer'

export const selectedUserIdsAtom = atom<string[]>([])

export const historyDrawerAtom = atom<THistoryDrawerProps>(
	defaultHistoryDrawerProps,
)
