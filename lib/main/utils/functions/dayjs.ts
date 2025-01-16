import dayjs, { Dayjs } from 'dayjs'

/**
 * 格式化日期範圍選擇器的值
 * 將可能是 [Dayjs, Dayjs] 的值傳入，回傳格式化後的日期陣列
 * 沒有的話就回傳 fallback
 */
export function formatRangePickerValue(
  values: unknown,
  format = 'YYYY-MM-DD',
  fallback = [],
) {
  if (!Array.isArray(values)) {
    return fallback
  }

  if (values.length !== 2) {
    return fallback
  }

  if (!values.every((value) => value instanceof dayjs)) {
    return fallback
  }

  return (values as [Dayjs, Dayjs]).map((value) => value.format(format))
}

/**
 * 解析日期範圍選擇器的值
 * 將可能是 [timestamp, timestamp] 的值傳入，回傳解析後的 [Dayjs, Dayjs]
 * 沒有的話就回傳 [undefined, undefined]
 */
export function parseRangePickerValue(values: unknown) {
  if (!Array.isArray(values)) {
    return [undefined, undefined]
  }

  if (values.length !== 2) {
    return [undefined, undefined]
  }

  if (values.every((value) => value instanceof dayjs)) {
    return values
  }

  if (values.every((value) => typeof value === 'number')) {
    return values.map((value) => {
      if (value.toString().length === 13) {
        return dayjs(value)
      }
      if (value.toString().length === 10) {
        return dayjs(value * 1000)
      }
    })
  }
  return [undefined, undefined]
}

/**
 * 將可能是 Dayjs 的值傳入，回傳格式化後的日期
 * 沒有的話就回傳 fallback
 */
export function formatDatePickerValue(
  value: unknown,
  format = 'YYYY-MM-DD',
  fallback = '',
) {
  if (!(value instanceof dayjs)) {
    return fallback
  }

  return (value as Dayjs).format(format)
}

/*
 * 將可能是 timestamp 的值傳入，回傳解析後的 Dayjs
 * 沒有的話就回傳 undefined
 */
export function parseDatePickerValue(value: unknown) {
  if (value instanceof dayjs) {
    return value
  }

  if (typeof value === 'number') {
    if (value.toString().length === 13) {
      return dayjs(value)
    }
    if (value.toString().length === 10) {
      return dayjs(value * 1000)
    }
  }
  return undefined
}
