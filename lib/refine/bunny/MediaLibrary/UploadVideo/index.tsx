import React from 'react'
import { useMediaUpload } from '@/refine/bunny/MediaLibrary/hooks'
import { Upload } from '@/components/general'

const UploadVideo = ({
  setActiveKey,
}: {
  setActiveKey: React.Dispatch<React.SetStateAction<string>>
}) => {
  const bunnyUploadProps = useMediaUpload({
    setActiveKey,
  })
  return (
    <div className="lg:max-w-[80rem]">
      <Upload {...bunnyUploadProps} />
    </div>
  )
}

export default UploadVideo
