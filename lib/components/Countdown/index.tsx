import React, { FC } from "react";
import RcCountdown, { CountdownRenderProps } from "react-countdown";
import "./styles.scss";

const CountdownDigit: FC<{ countdownProps: CountdownRenderProps }> = ({
  countdownProps,
}) => {
  const { formatted } = countdownProps;
  const timeUnits = Object.keys(formatted).map((timeUnit) =>
    formatted[timeUnit as keyof typeof formatted].split("")
  );

  return (
    <div
      className="au_countdown grid gap-x-3 md:gap-x-8 gap-y-4"
      style={{
        gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
      }}
    >
      {timeUnits.map((timeUnitArr, i) => {
        return (
          <div key={`_${i}`} className="grid gap-x-1 md:gap-x-2 grid-cols-2">
            {timeUnitArr.map((number, j) => (
              <div key={`_${i}_${j}`} className="au_countdown_digit">
                {number}
              </div>
            ))}
          </div>
        );
      })}

      <div className="text-center text-xs">Days</div>
      <div className="text-center text-xs">Hours</div>
      <div className="text-center text-xs">Minutes</div>
      <div className="text-center text-xs">Seconds</div>
    </div>
  );
};

export const Countdown: FC<{
  date: number;
  title?: React.ReactNode;
  className?: string;
  width?: string | number;
}> = ({ date, title, className = "text-center", width }) => {
  if (date.toString().length !== 13) {
    return (
      <div className="text-center">
        <p>OOPS! 出錯拉</p>
        <p>date 請輸入 毫秒(13位) 數字</p>
      </div>
    );
  }

  return (
    <div className={className} style={width ? { width } : {}}>
      {title && title}
      <div>
        <RcCountdown
          date={Date.now() + date - Date.now()}
          renderer={(props) => <CountdownDigit countdownProps={props} />}
        />
      </div>
    </div>
  );
};
