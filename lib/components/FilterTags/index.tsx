import React from "react";
import { Tag, FormInstance } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { CloseCircleOutlined } from "@ant-design/icons";
import { BaseRecord } from "@refinedev/core";


export function FilterTags<T = BaseRecord>({ form, keyFormatter }:{
	form: FormInstance<T>;
	keyFormatter?: (key: (keyof T)) => string;
}) : React.ReactNode{
  const searchValues = form.getFieldsValue();
  const handleClearSearchProps = (key: string) => () => {
    form?.setFieldValue([key], undefined);
    form?.submit();
  };

  const searchKeys = Object.keys(searchValues || {}) as (keyof T)[];

  return (
    <>
      {searchValues &&
        searchKeys.map((key) => {
          if (searchValues?.[key] === undefined || searchValues?.[key] === null)
            return null;

          if (
            Array.isArray(searchValues?.[key]) &&
            (searchValues?.[key] as unknown[])?.every((item: unknown) => item instanceof dayjs)
          ) {
            return (
              <Tag
                key={key as string}
                bordered={false}
                color="cyan"
                className="px-2.5 py-0.5"
                closeIcon={<CloseCircleOutlined />}
                onClose={handleClearSearchProps(key as string)}
              >
                {keyFormatter ? keyFormatter(key) : key as string}:{" "}
                {(searchValues[key] as Dayjs[])
                  .map((date) => (date ? date.format("YYYY/MM/DD") : ""))
                  .join(" ~ ")}
              </Tag>
            );
          }

          if (typeof searchValues?.[key] === "boolean") {
            return (
              <Tag
                key={key as string}
                bordered={false}
                color="cyan"
                className="px-2.5 py-0.5"
                closeIcon={<CloseCircleOutlined />}
                onClose={handleClearSearchProps(key as string)}
              >
                {keyFormatter ? keyFormatter(key) : key as string}: {searchValues?.[key]?.toString()}
              </Tag>
            );
          }

          return (
            <Tag
              key={key as string}
              bordered={false}
              color="cyan"
              className="px-2.5 py-0.5"
              closeIcon={<CloseCircleOutlined />}
              onClose={handleClearSearchProps(key as string)}
            >
             {keyFormatter ? keyFormatter(key) : key as string}: {searchValues?.[key]?.toString()}
            </Tag>
          );
        })}
    </>
  );
}
