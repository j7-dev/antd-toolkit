import { Component, ErrorInfo, ReactNode } from 'react'
import { Alert, Button } from 'antd'

type TErrorBoundaryProps = {
	children: ReactNode
}

type TErrorBoundaryState = {
	hasError: boolean
}

/**
 * BlockNote 編輯器的錯誤邊界
 *
 * custom block 的 toExternalHTML 會經 portal + flushSync 掛在主 React tree，一旦 render
 * throw，React 18 會把整棵樹 unmount 造成白屏；瀏覽器翻譯／廣告攔截等擴充也可能改動
 * contenteditable DOM 觸發例外。用 ErrorBoundary 攔下錯誤、顯示可重試的 fallback，
 * 避免整頁崩潰。
 */
export class ErrorBoundary extends Component<
	TErrorBoundaryProps,
	TErrorBoundaryState
> {
	constructor(props: TErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(): TErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('BlockNote ErrorBoundary 捕捉到錯誤:', error, info)
	}

	handleReset = () => {
		// 重置狀態重新掛載 children，讓使用者可在排除擴充干擾後重試
		this.setState({ hasError: false })
	}

	render() {
		if (this.state.hasError) {
			return (
				<Alert
					type="error"
					showIcon
					message="編輯器發生錯誤"
					description="編輯器渲染時發生非預期的錯誤。您可以嘗試重新載入編輯器；若問題持續，請關閉瀏覽器的翻譯或廣告攔截等擴充功能後再試。"
					action={
						<Button size="small" danger onClick={this.handleReset}>
							重新載入編輯器
						</Button>
					}
				/>
			)
		}

		return this.props.children
	}
}
