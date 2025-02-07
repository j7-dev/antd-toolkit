import React, { useState, useEffect } from 'react'
import { defaultImage } from '@/main/utils'
import { nanoid } from 'nanoid'

export const Gallery: React.FC<{
	images: string[]
	selectedImage?: string
}> = ({ images, selectedImage }) => {
	const [selected, setSelected] = useState(images[0])
	useEffect(() => {
		if (!!selectedImage && isInclude) {
			setSelected(selectedImage)
		} else {
			setSelected(images[0])
		}
	}, [selectedImage])

	if (images.length === 0) {
		return (
			<img
				className="at-aspect-square at-w-full at-object-cover"
				src={defaultImage}
			/>
		)
	}
	const isInclude = images.some((i) => i === selectedImage)

	const handleClick = (src: string) => () => {
		setSelected(src)
	}

	const mainSrc = images.find((image) => image === selected) ?? images[0]

	return (
		<>
			<img
				className="at-aspect-square at-w-full at-object-cover"
				src={mainSrc}
			/>
			{images.length > 1 && (
				<div className="at-mt-2 at-w-full at-grid at-grid-cols-4 at-gap-2">
					{images.map((image) => (
						<img
							key={nanoid()}
							className={`at-aspect-square at-cursor-pointer at-object-cover at-w-full ${
								image === selected &&
								'at-border-2 at-border-blue-500 at-border-solid'
							}`}
							onClick={handleClick(image)}
							src={image}
							style={{ width: '-webkit-fill-available' }}
						/>
					))}
				</div>
			)}
		</>
	)
}
