import React from "react";
import dayjs from "dayjs";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

type TDateProps = {
  icon?: React.ReactNode;
  format?: string;
};

export const DateTime: React.FC<{
  date: number;
  className?: string;
  dateProps?: TDateProps;
  timeProps?: TDateProps;
}> = ({ date, className, dateProps, timeProps }) => {
  if (date.toString().length !== 13) {
    return (
      <div className="text-center">
        <p>OOPS! 出錯拉</p>
        <p>date 請輸入 毫秒(13位) 數字</p>
      </div>
    );
  }

  const dateIcon = dateProps?.icon || <CalendarOutlined className="mr-2" />;
  const dateFormat = dateProps?.format || "YYYY-MM-DD";
  const timeIcon = timeProps?.icon || <ClockCircleOutlined className="mr-2" />;
  const timeFormat = timeProps?.format || "HH:mm:ss";

  return (
    <div className={className}>
      <p className="m-0 whitespace-nowrap">
        {dateIcon}
        {dayjs(date).format(dateFormat)}
      </p>
      <p className="m-0 whitespace-nowrap">
        {timeIcon}
        {dayjs(date).format(timeFormat)}
      </p>
    </div>
  );
};
