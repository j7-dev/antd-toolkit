import React from "react";

export const renderHTML = (HTMLstring: string) =>
  React.createElement("div", {
    dangerouslySetInnerHTML: { __html: HTMLstring },
  });

// export const getCopyableJson = (variable: any) => {
//   const jsonStringStrippedEscapeC = JSON.stringify(
//     JSON.stringify(variable || "{}")
//   ).replace(/\\/g, "");
//   const jsonString = jsonStringStrippedEscapeC.slice(
//     1,
//     jsonStringStrippedEscapeC.length - 1
//   );

//   if (typeof variable === "object") {
//     const countKeys = Object.keys(variable).length;

//     return countKeys === 0 ? "" : jsonString;
//   }
//   return variable ? jsonString : "";
// };

export const getQueryString = (name: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(name);
  return paramValue;
};

export const filterObjKeys = (
  obj: object,
  filterValues: (string | number | boolean | undefined | null)[] = [undefined]
) => {
  for (const key in obj) {
    if (filterValues.includes(obj[key as keyof typeof obj])) {
      delete obj[key as keyof typeof obj];
    } else if (typeof obj[key as keyof typeof obj] === "object") {
      filterObjKeys(obj[key as keyof typeof obj]); // 递归处理嵌套对象
      if (Object.keys(obj[key as keyof typeof obj]).length === 0) {
        delete obj[key as keyof typeof obj];
      }
    }
  }

  return obj;
};

// Camel or snake case to word
export const keyToWord = (str: string) => {
  // 判斷是否為 snake_case 或 Camel Case
  if (str.includes("_")) {
    // 將 snake_case 轉換為 Camel Case
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    // 將 Camel Case 轉換為 Camel Case（確保第一個單詞首字母大寫）
    return (
      str.charAt(0).toUpperCase() +
      str.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")
    );
  }
};
