import React from 'react'
import ReactDOM from 'react-dom'

export const Portal = ({
	children,
	target,
}: {
	children: React.ReactNode
	target?: HTMLElement
}): React.ReactNode => {
	// @ts-ignore
	return ReactDOM.createPortal(children, target || document.body)
}
