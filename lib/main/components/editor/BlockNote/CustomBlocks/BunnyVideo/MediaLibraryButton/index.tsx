import { useEffect, memo } from 'react'
import { Button } from 'antd'
import { mediaLibraryAtom, useBunny } from '@/refine'
import { useAtom } from 'jotai'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema,
} from '@blocknote/core'
import { TbSwitchHorizontal } from 'react-icons/tb'

export type TMediaLibraryButton = ReactCustomBlockRenderProps<
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema
>

const MediaLibraryButton = (props: TMediaLibraryButton) => {
	const { bunny_library_id } = useBunny()
	const [mediaLibrary, setMediaLibrary] = useAtom(mediaLibraryAtom)

	const confirmedSelectedVId = mediaLibrary.confirmedSelectedVideos?.[0]?.guid
	const key = mediaLibrary.key
	const blockId = props.editor.getBlock(props.block)?.id || ''

	const vId = props.editor.getBlock(props.block)?.props?.vId

	useEffect(() => {
		const timer = setTimeout(() => {
			if (confirmedSelectedVId && key === blockId) {
				props.editor.updateBlock(props.block, {
					type: 'bunnyVideo',
					props: { vId: confirmedSelectedVId as any },
				})
			}
		}, 300)

		return () => clearTimeout(timer)
	}, [confirmedSelectedVId, blockId, key])

	const handleOpenMediaLibrary = () => {
		setMediaLibrary((prev) => ({
			...prev,
			modalProps: {
				...prev.modalProps,
				open: true,
			},
			mediaLibraryProps: {
				...prev.mediaLibraryProps,
				selectedVideos: [],
			},
			name: undefined,
			form: undefined,
			confirmedSelectedVideos: [],
			key: blockId,
		}))
	}

	const videoUrl = `https://iframe.mediadelivery.net/embed/${bunny_library_id}/${vId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`

	const handleSwitch = () => {
		setMediaLibrary((prev) => ({
			...prev,
			modalProps: {
				...prev.modalProps,
				open: true,
			},
			mediaLibraryProps: {
				...prev.mediaLibraryProps,
				selectedVideos: [],
			},
			name: undefined,
			form: undefined,
			confirmedSelectedVideos: [],
			key: blockId,
		}))
	}

	return (
		<>
			<div
				className={'bn-file-block-content-wrapper at-w-full'}
				data-editable="1"
				ref={props.contentRef}
			>
				{!vId && (
					<Button size="small" type="primary" onClick={handleOpenMediaLibrary}>
						開啟 Bunny 媒體庫
					</Button>
				)}
				{!!vId && (
					<div className="at-relative at-aspect-video at-rounded-lg at-border at-border-dashed at-border-gray-300">
						<div className="at-absolute at-size-full at-top-0 at-left-0 at-p-2">
							<div className="at-size-full at-rounded-xl at-overflow-hidden">
								<div
									className="at-rounded-xl at-bg-gray-200 at-tw-block"
									style={{
										position: 'relative',
										paddingTop: '56.25%',
									}}
								>
									<iframe
										className="at-border-0 at-absolute at-top-0 at-left-0 at-size-full at-rounded-xl"
										src={videoUrl}
										loading="lazy"
										allow="encrypted-media;picture-in-picture;"
										allowFullScreen={true}
									></iframe>

									<div
										onClick={handleSwitch}
										className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-size-12 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-primary at-cursor-pointer"
									>
										<TbSwitchHorizontal className="at-text-primary group-hover:at-text-white" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default memo(MediaLibraryButton)
