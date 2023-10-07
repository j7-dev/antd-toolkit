import React from "react";
import { isNumber, isString, isNull, isUndefined } from "lodash-es";

export const ObjectTable: React.FC<{
  data: {
    [key: string]: any;
  };
}> = ({ data }) => {
  return (
    <table className="table table-vertical mt-8 mb-16">
      <tbody>
        {Object.keys(data).map((key) => {
          if (
            isNumber(data?.[key]) ||
            isString(data?.[key]) ||
            isNull(data?.[key]) ||
            isUndefined(data?.[key])
          ) {
            return (
              <tr key={key}>
                <th>{key}</th>
                <td>{data?.[key]}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};
