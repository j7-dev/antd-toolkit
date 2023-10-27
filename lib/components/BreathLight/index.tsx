type TProps = {
  color?: string;
  size?: string;
};
export const BreathLight = ({ color = "orange", size = "0.75rem" }: TProps) => {
  return (
    <span
      className="flex relative"
      style={{
        height: size,
        width: size,
      }}
    >
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
        style={{
          backgroundColor: color,
        }}
      ></span>
      <span
        className="relative inline-flex rounded-full"
        style={{
          backgroundColor: color,
          height: size,
          width: size,
        }}
      ></span>
    </span>
  );
};
