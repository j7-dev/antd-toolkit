export const BOOLEAN_OPTIONS = [
	{ label: '是', value: 'yes' },
	{ label: '否', value: 'no' },
]

export const BOOLEAN_OPTIONS_REVERSE = BOOLEAN_OPTIONS.reverse()

export const POST_STATUS = [
  {
    label: '已發佈',
    value: 'publish' as const,
    color: 'blue',
  },
  {
    label: '送交審閱',
    value: 'pending' as const,
    color: 'volcano',
  },
  {
    label: '草稿',
    value: 'draft' as const,
    color: 'orange',
  },
  {
    label: '私密',
    value: 'private' as const,
    color: 'purple',
  },
	{
    label: '回收桶',
    value: 'trash' as const,
    color: 'red',
  },
]

export const PRODUCT_STATUS = POST_STATUS


export const USER_ROLES = [
  {
    label: '網站管理員',
    value: 'administrator' as const,
    color: 'red',
  },
  {
    label: '商店經理',
    value: 'shop_manager' as const,
    color: 'orange',
  },
  {
    label: '編輯',
    value: 'editor' as const,
    color: 'pink',
  },
  {
    label: '作者',
    value: 'author' as const,
    color: 'green',
  },
  {
    label: '翻譯',
    value: 'translator' as const,
    color: 'cyan',
  },
  {
    label: '投稿者',
    value: 'contributor' as const,
    color: 'purple',
  },
  {
    label: '顧客',
    value: 'customer' as const,
    color: 'blue',
  },
  {
    label: '訂閱者',
    value: 'subscriber' as const,
    color: 'gray',
  },
]


