import React, { FC } from 'react'
import RcCountdown, { CountdownRenderProps } from 'react-countdown'
import { useLocale } from '@/main/components/LocaleProvider'
import './styles.scss'

// TODO 棄用，改用 daisyUI 的
const CountdownDigit: FC<{
	countdownProps: CountdownRenderProps
	labels: { days: string; hours: string; minutes: string; seconds: string }
}> = ({ countdownProps, labels }) => {
	const { formatted } = countdownProps
	const timeUnits = Object.keys(formatted).map((timeUnit) =>
		formatted[timeUnit as keyof typeof formatted].split(''),
	)

	return (
		<div
			className="au_countdown at-grid at-gap-x-3 md:at-gap-x-8 at-gap-y-4"
			style={{
				gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
			}}
		>
			{timeUnits.map((timeUnitArr, i) => {
				return (
					<div
						key={`_${i}`}
						className="at-grid at-gap-x-1 md:at-gap-x-2 at-grid-cols-2"
					>
						{timeUnitArr.map((number, j) => (
							<div key={`_${i}_${j}`} className="au_countdown_digit">
								{number}
							</div>
						))}
					</div>
				)
			})}

			<div className="at-text-center at-text-xs">{labels.days}</div>
			<div className="at-text-center at-text-xs">{labels.hours}</div>
			<div className="at-text-center at-text-xs">{labels.minutes}</div>
			<div className="at-text-center at-text-xs">{labels.seconds}</div>
		</div>
	)
}

export const Countdown: FC<{
	date: number
	title?: React.ReactNode
	className?: string
	width?: string | number
}> = ({ date, title, className = 'at-text-center', width }) => {
	const t = useLocale('Countdown')

	if (date.toString().length !== 13) {
		return (
			<div className="at-text-center">
				<p>{t.error}</p>
				<p>{t.invalidDate}</p>
			</div>
		)
	}

	return (
		<div className={className} style={width ? { width } : {}}>
			{title && title}
			<div>
				<RcCountdown
					date={Date.now() + date - Date.now()}
					renderer={(props) => <CountdownDigit countdownProps={props} labels={t} />}
				/>
			</div>
		</div>
	)
}
