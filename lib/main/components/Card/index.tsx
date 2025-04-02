import { Card as AntdCard, CardProps } from 'antd'

/**
 * 卡片元件
 * 基於 Antd Card 組件的封裝，提供要不要顯示卡片容器的選項 showCard
 * why: 因為有頁面組件通常會搭配卡片，例如 user list ，但有時候做篩選器時，也會搭配這個 user list 但不需要顯示卡片容器
 * @component
 * @param {CardProps} props - Antd Card 組件的所有屬性
 * @param {React.ReactNode} props.children - 卡片內容
 * @param {boolean} [props.showCard=true] - 是否顯示卡片容器，預設為 true
 * @returns {React.ReactElement} 返回卡片組件或純內容
 *
 * @example
 * // 基本用法
 * <Card title="標題">
 *   <p>卡片內容</p>
 * </Card>
 *
 * // 不顯示卡片容器
 * <Card showCard={false}>
 *   <p>純內容</p>
 * </Card>
 */
export const Card = ({
	children,
	showCard = true,
	...props
}: CardProps & { showCard?: boolean }) => {
	return showCard ? <AntdCard {...props}>{children}</AntdCard> : children
}
