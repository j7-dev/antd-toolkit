import { YooptaPlugin } from '@yoopta/editor'
import Paragraph from '@yoopta/paragraph'
import Blockquote from '@yoopta/blockquote'
import Embed from '@yoopta/embed'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import Callout from '@yoopta/callout'

// import Video from '@yoopta/video'

// import File from '@yoopta/file'

import { NumberedList, BulletedList, TodoList } from '@yoopta/lists'
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings'

// import Accordion from '@yoopta/accordion'

// import Code from '@yoopta/code'

import { uploadWP } from './uploadWP'
import { TApiConfig } from '../types'

export const DEFAULT = {
  API: 'http://ltest.test:8080/wp-json/power-course/upload',
  USERNAME: 'j7',
  PASSWORD: 'gRJ0 14kC n9ye kQft k2Iz 5BAP',
}

export const getPlugins = (apiConfig: TApiConfig) => {
  const plugins = [
    // File.extend({
    //   options: {
    //     onUpload: async (file) => {
    //       const data = await uploadToCloudinary(file, 'auto')

    //       return {
    //         src: data.secure_url,
    //         format: data.format,
    //         name: data.name,
    //         size: data.bytes,
    //       }
    //     },
    //   },
    // }),

    // Code,

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

    // Accordion,

    Image.extend({
      options: {
        async onUpload(file) {
          const data = await uploadWP(file, 'image', apiConfig)

          return {
            src: data?.url,
            alt: data?.name,
            sizes: {
              width: data.width,
              height: data.height,
            },
          }
        },
      },
    }),

    // Video.extend({
    //   options: {
    //     onUpload: async (file) => {
    //       const data = await uploadToCloudinary(file, 'video')
    //       return {
    //         src: data.secure_url,
    //         alt: 'cloudinary',
    //         sizes: {
    //           width: data.width,
    //           height: data.height,
    //         },
    //       }
    //     },
    //   },
    // }),
  ] as YooptaPlugin[]

  return plugins
}
