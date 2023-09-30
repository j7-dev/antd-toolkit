import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

export const Amount: React.FC<{
  amount: number | null;
  currency: string | null;
  symbol?: boolean;
  className?: string;
}> = ({
  amount: rawAmount,
  currency: rawCurrency,
  symbol = false,
  className = "",
}) => {
  const amount = rawAmount || 0;
  const currency = rawCurrency || "";
  return (
    <span className={`whitespace-nowrap ${className}`}>
      <span>
        {symbol
          ? getSymbolFromCurrency(currency.toUpperCase())
          : currency.toUpperCase()}
      </span>{" "}
      {amount.toLocaleString()}
    </span>
  );
};
