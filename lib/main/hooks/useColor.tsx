import { theme, type GlobalToken } from 'antd'

const { useToken } = theme

export const useColor = (): GlobalToken => {
  const { token } = useToken()

  return { ...token }
}
