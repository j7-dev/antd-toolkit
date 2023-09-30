import React from "react";
import { Tag, FormInstance } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { CloseCircleOutlined } from "@ant-design/icons";

const FilterTags: React.FC<{ form?: FormInstance }> = ({ form }) => {
  const searchValues = form ? form.getFieldsValue() : {};
  const handleClearSearchProps = (key: string) => () => {
    form?.setFieldValue([key], undefined);
    form?.submit();
  };

  const searchKeys = Object.keys(searchValues || {});

  return (
    <>
      {searchValues &&
        searchKeys.map((key) => {
          if (searchValues?.[key] === undefined || searchValues?.[key] === null)
            return null;

          if (
            Array.isArray(searchValues?.[key]) &&
            searchValues[key].every((item: any) => item instanceof dayjs)
          ) {
            return (
              <Tag
                key={key}
                bordered={false}
                color="cyan"
                className="px-2.5 py-0.5"
                closeIcon={<CloseCircleOutlined />}
                onClose={handleClearSearchProps(key)}
              >
                {key}:{" "}
                {(searchValues[key] as Dayjs[])
                  .map((date) => (date ? date.format("YYYY/MM/DD") : ""))
                  .join(" ~ ")}
              </Tag>
            );
          }

          if (typeof searchValues?.[key] === "boolean") {
            return (
              <Tag
                key={key}
                bordered={false}
                color="cyan"
                className="px-2.5 py-0.5"
                closeIcon={<CloseCircleOutlined />}
                onClose={handleClearSearchProps(key)}
              >
                {key}: {searchValues?.[key].toString()}
              </Tag>
            );
          }

          return (
            <Tag
              key={key}
              bordered={false}
              color="cyan"
              className="px-2.5 py-0.5"
              closeIcon={<CloseCircleOutlined />}
              onClose={handleClearSearchProps(key)}
            >
              {key}: {searchValues?.[key]}
            </Tag>
          );
        })}
    </>
  );
};

export default FilterTags;
