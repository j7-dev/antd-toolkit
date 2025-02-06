import React, { useState } from 'react'
import { useSelect } from '@refinedev/antd'
import { SelectProps } from 'antd'
import { BaseRecord, UseSelectProps, HttpError } from '@refinedev/core'
import { defaultSelectProps } from 'antd-toolkit'

type TUseItemSelectParams<T extends BaseRecord> = {
	selectProps?: SelectProps
	useSelectProps: UseSelectProps<T, HttpError, T>
}

/**
 * 可搜尋的 資源，例如 CPT 的 Select 元件，支援搜尋功能
 * @param selectProps - antd Select 元件的 props
 * @param useSelectProps - refine useSelect hook 的 props，需要指定 resources
 * @returns {{selectProps: SelectProps, itemIds: string[], setItemIds: (value: string[]) => void}}
 * - selectProps: 合併後的 Select props
 * - itemIds: 已選擇的項目 id 陣列
 * - setItemIds: 設定已選擇項目的函式
 */
export function useItemSelect<
	T extends BaseRecord & { name: string; id: string },
>({ selectProps, useSelectProps }: TUseItemSelectParams<T>) {
	const [itemIds, setItemIds] = useState<string[]>([])

	const { selectProps: refineSelectProps } = useSelect<T>({
		optionLabel: (item) => item.name,
		optionValue: (item) => item.id,
		debounce: 500,
		pagination: {
			pageSize: 20,
			mode: 'server',
		},
		onSearch: (value) => [
			{
				field: 's',
				operator: 'contains',
				value,
			},
		],
		...useSelectProps,
	})

	const mergedSelectProps: SelectProps = {
		...defaultSelectProps,
		...selectProps,
		...refineSelectProps,
		value: itemIds,
		onChange: (value: string[]) => {
			setItemIds(value)
		},
	}

	return {
		selectProps: mergedSelectProps,
		itemIds,
		setItemIds,
	}
}
