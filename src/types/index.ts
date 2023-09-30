export type TConstant<T> = {
  label: string;
  value: T;
  color?: string;
};

export type TGetColumnFilterProps<T> = {
  dataSource: readonly TConstant<string | number | boolean>[] | readonly T[];
  dataIndex: keyof T;
  dataFrom?: "local" | "fetched";
  exactMatch?: boolean;
};
