import { useColor } from "./index";

export const Components = () => {
  const { colorPrimary } = useColor();

  return <div style={{ color: colorPrimary }}>Components</div>;
};
