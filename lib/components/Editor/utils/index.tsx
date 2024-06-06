import { YooptaPlugin } from '@yoopta/editor'
import Paragraph from '@yoopta/paragraph'
import Blockquote from '@yoopta/blockquote'
import Embed from '@yoopta/embed'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import Callout from '@yoopta/callout'
import Video from '@yoopta/video'
import File from '@yoopta/file'
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists'
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings'
import Code from '@yoopta/code'
import { uploadToCloudinary } from './cloudinary'

export const plugins = [
  File.extend({
    options: {
      onUpload: async (file) => {
        const data = await uploadToCloudinary(file, 'auto')

        return {
          src: data.secure_url,
          format: data.format,
          name: data.name,
          size: data.bytes,
        }
      },
    },
  }),
  Code,
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
        const data = await uploadToCloudinary(file, 'image')

        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        }
      },
    },
  }),
  Video.extend({
    options: {
      onUpload: async (file) => {
        const data = await uploadToCloudinary(file, 'video')
        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        }
      },
    },
  }),
] as YooptaPlugin[]
