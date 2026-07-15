import './styles.scss'

export const LoadingPage = () => {
	return (
		<div className="at-relative">
			<div className="atk-loading">
				<div className="atk-loading__square"></div>
				<div className="atk-loading__square"></div>
				<div className="atk-loading__square"></div>
				<div className="atk-loading__square"></div>
				<div className="atk-loading__square"></div>
				<div className="atk-loading__square"></div>
				<div className="atk-loading__square"></div>
			</div>
			<p className="at-text-center at-text-gray-500">Loading...</p>
		</div>
	)
}
