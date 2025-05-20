import React from 'react'

const Alt = ({
	color = '#444',
	className = 'at-size-4',
}: {
	color?: string
	className?: string
}) => {
	return (
		<svg
			viewBox="0 0 16 16"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			fill={color}
			className={className}
		>
			<g stroke-width="0"></g>
			<g stroke-linecap="round" stroke-linejoin="round"></g>
			<g>
				<path
					fill={color}
					d="M14 7v-1h-1v-1h-1v1h-0.5v1h0.5v3.56c0 1 0.56 1.44 2 1.44v-1c-0.055 0.012-0.119 0.019-0.185 0.019-0.359 0-0.669-0.21-0.813-0.514l-0.002-3.505h1z"
				></path>
				<path fill={color} d="M9 3h1v9h-1v-9z"></path>
				<path
					fill={color}
					d="M3 12l0.57-2h2.82l0.61 2h1l-2.27-8h-1.46l-2.27 8h1zM5 5.1l1.11 3.9h-2.22z"
				></path>
			</g>
		</svg>
	)
}

export default Alt
