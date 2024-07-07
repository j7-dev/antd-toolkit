// TODO API 串接

export const WP = {
  API: 'http://ltest.test:8080/wp-json/power-course/upload',
  USERNAME: 'j7',
  PASSWORD: 'gRJ0 14kC n9ye kQft k2Iz 5BAP',
}

export type TUploadResponse = {
  code: string
  message: string
  data: TUploadData
}

export type TUploadData = {
  url: string
  type: string
  id: string | null
  name: string
  size: number
  width: number
  height: number
}

export const uploadWP = async (
  file: File,
  type = 'image',
): Promise<TUploadData> => {
  const formData = new FormData()
  formData.append('files', file)
  formData.append('upload_only', '1')

  const headers = new Headers()
  headers.append(
    'Authorization',
    'Basic ' + btoa(WP.USERNAME + ':' + WP.PASSWORD),
  )

  try {
    const call = await fetch(WP.API, {
      method: 'POST',
      headers,
      body: formData,
    })
    const response: TUploadResponse = await call.json()
    return response?.data
  } catch (error) {
    return Promise.reject(error)
  }
}
