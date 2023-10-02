import React from "react";
export declare const windowOuterWidth: number;
export declare const isIphone: boolean;
export declare const renderHTML: (rawHTML: string) => React.DetailedReactHTMLElement<{
    dangerouslySetInnerHTML: {
        __html: string;
    };
}, HTMLElement>;
export declare const handleClearZero: (e: React.MouseEvent<HTMLInputElement>) => void;
export declare const getCopyableJson: (variable: any) => string;
export declare const getQueryString: (name: string) => string | null;
export declare const getCurrencyString: ({ price, symbol, }: {
    price: number | string | undefined;
    symbol?: string | undefined;
}) => string;
export declare const filterObjKeys: (obj: object, arr?: (string | number | boolean | undefined | null)[]) => object;
