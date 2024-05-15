

export type TBlock =  {
	"id": string;
	"value": [
		{
			"id": string
			"type": string
			"children": [
				{
					"text": string
				}
			],
			"props": {
				"nodeType": string
			}
		}
	],
	"type": string
	"meta": {
		"order": number
		"depth": number
	}
}