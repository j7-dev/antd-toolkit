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
]
