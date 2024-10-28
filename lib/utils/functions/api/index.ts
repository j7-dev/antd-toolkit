import { toFormData as axiosToFormData, GenericFormData } from 'axios'

/**
 * 因為 原本 axios 的 toFormData 會把空陣列轉為過濾掉，這樣後端收不到資料
 * 我希望還是能傳 '[]'給後端處理
 * @param  data
 * @return {GenericFormData}
 */
export const toFormData = (data: object): GenericFormData => {
  const formattedData = Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        acc[key] = '[]'
        return acc
      }
      if (value === null || value === undefined) {
        acc[key] = ''
        return acc
      }
      acc[key] = value

      return acc
    },
    {} as {
      [key: string]: any
    },
  )

  const formData = axiosToFormData(formattedData)

  return formData
}
