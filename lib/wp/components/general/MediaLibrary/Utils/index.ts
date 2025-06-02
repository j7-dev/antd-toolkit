export class MimeTypeValidator {
	/**
	 * 允許的 MIME 類型
	 */
	allowMimeTypes: string[]

	/**
	 * @param accept 	string | undefined
	 * 可能為
	 * image/*
	 * image/*, application/*
	 * image/jpeg, application/pdf
	 */
	constructor(accept: string | undefined) {
		if (!accept) {
			this.allowMimeTypes = []
			return
		}

		// 去除所有空白，用 , 分割為 array
		const types = accept.replace(/\s/g, '').split(',')
		this.allowMimeTypes = types
	}

	/**
	 * 驗證 MIME 類型是否符合允許的類型
	 * @param mimeType - 要驗證的 MIME 類型
	 * @returns 如果符合允許的類型返回 true，否則返回 false
	 * @example
	 * ```ts
	 * const utils = new MediaLibraryUtils('image/*')
	 * utils.validate('image/jpeg') // true
	 * utils.validate('video/mp4') // false
	 * ```
	 */
	validate = (mimeType: string): boolean => {

console.log('🐛 ', {
		allow: this.allowMimeTypes,
		mimeType,
});

		if (!this.allowMimeTypes?.length) {
			return true
		}

		return this.allowMimeTypes.some((type) => {
			if (type.endsWith('/*')) {
				return mimeType.startsWith(type.slice(0, -1))
			}

			return mimeType === type
		})
	}
}