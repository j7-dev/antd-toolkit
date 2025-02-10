// 只在開發環境導入 tailwind
// if (import.meta?.env?.DEV || import.meta?.env?.BUILD_ENV === 'storybook') {
// 	import('@/main/assets/scss/_tailwind.scss')
// }
import '@/main/assets/scss/_tailwind.scss'
import '@/main/assets/scss/index.scss'

export * from '@/main/types'
export * from '@/main/components'
export * from '@/main/hooks'
export * from '@/main/utils'
