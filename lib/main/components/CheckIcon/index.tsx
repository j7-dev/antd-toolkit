import React, { FC, HTMLAttributes } from 'react'

export const CheckIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
	return (
		<svg
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			{...props}
		>
			<g strokeWidth="0"></g>
			<g strokeLinecap="round" strokeLinejoin="round"></g>
			<g>
				{' '}
				<path
					fill="#000000"
					fillRule="evenodd"
					d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
				></path>{' '}
			</g>
		</svg>
	)
}
