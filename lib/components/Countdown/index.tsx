import React, { FC } from "react";
import RcCountdown, { CountdownRenderProps } from "react-countdown";
import dayjs, { Dayjs } from "dayjs";
import "./styles.scss";

const CountdownDigit: FC<{ countdownProps: CountdownRenderProps }> = ({
  countdownProps,
}) => {
  const { days, hours, minutes, seconds } = countdownProps;
  const dayLength = days < 10 ? 2 : days.toString().length;
  const dayArr = days.toString().padStart(2, "0").split("");
  const timeArr = `${hours.toString().padStart(2, "0")}${minutes
    .toString()
    .padStart(2, "0")}${seconds.toString().padStart(2, "0")}`.split("");

  return (
    <div
      className="au_countdown grid gap-x-2 gap-y-4"
      style={{
        gridTemplateColumns: `repeat(${dayLength + 6}, minmax(0, 1fr))`,
      }}
    >
      {dayArr.map((number, index) => (
        <div key={`day-${index}`} className="au_countdown_digit">
          {number}
        </div>
      ))}
      {timeArr.map((number, index) => (
        <>
          <div key={`time-${index}`} className="au_countdown_digit">
            {number}
          </div>
        </>
      ))}
      <div
        className="text-center text-xs"
        style={{
          gridColumn: `span ${dayLength} / span ${dayLength}`,
        }}
      >
        Days
      </div>
      <div className="col-span-2 text-center text-xs">Hours</div>
      <div className="col-span-2 text-center text-xs">Minutes</div>
      <div className="col-span-2 text-center text-xs">Seconds</div>
    </div>
  );
};

export const Countdown: FC<{
  toTime: Dayjs;
  title?: React.ReactNode;
  className?: string;
  width?: string | number;
}> = ({ toTime, title, className = "text-center", width }) => {
  if (!(toTime instanceof dayjs)) {
    return (
      <div className="text-center">
        <p>OOPS! 出錯拉</p>
        <p>toTime 請輸入 dayjs 物件格式</p>
      </div>
    );
  }

  return (
    <div className={className ? className : ""} style={width ? { width } : {}}>
      {title && title}
      <div>
        <RcCountdown
          date={Date.now() + toTime.valueOf() - Date.now()}
          renderer={(props) => <CountdownDigit countdownProps={props} />}
        />
      </div>
    </div>
  );
};
