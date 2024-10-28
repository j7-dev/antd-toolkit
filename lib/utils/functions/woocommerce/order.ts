export const ORDER_STATUS = [
  {
    label: '處理中',
    value: 'processing' as const,
    color: '#108ee9',
  },
  {
    label: '等待付款中',
    value: 'pending' as const,
    color: 'volcano',
  },
  {
    label: '配送中',
    value: 'wmp-in-transit' as const,
    color: '#2db7f5',
  },
  {
    label: '已出貨',
    value: 'wmp-shipped' as const,
    color: 'green',
  },
  {
    label: '保留',
    value: 'on-hold' as const,
    color: 'gold',
  },
  {
    label: '已完成',
    value: 'completed' as const,
    color: '#87d068',
  },
  {
    label: '已取消',
    value: 'cancelled' as const,
    color: 'orange',
  },
  {
    label: '已退款',
    value: 'refunded' as const,
    color: 'volcano',
  },
  {
    label: '失敗訂單',
    value: 'failed' as const,
    color: 'magenta',
  },
  {
    label: '未完成結帳',
    value: 'checkout-draft' as const,
    color: 'gold',
  },
  {
    label: 'RY 等待撿貨中',
    value: 'ry-at-cvs' as const,
    color: 'cyan',
  },
  {
    label: 'RY 訂單過期',
    value: 'ry-out-cvs' as const,
    color: 'purple',
  },
]

export const getOrderStatus = (status: string) => {
  const formattedStatus = status.startsWith('wc-') ? status.slice(3) : status
  const statusObj = ORDER_STATUS.find((item) => item.value === formattedStatus)
  return statusObj
}
