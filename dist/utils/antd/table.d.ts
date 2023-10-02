import { TGetColumnFilterProps } from "../../types";
export declare const getColumnFilterProps: <DataType extends {
    [key: string]: string | number | boolean | null;
}>({ dataSource, dataIndex, dataFrom, exactMatch, }: TGetColumnFilterProps<DataType>) => {
    filters: {
        text: string | number | boolean | null;
        value: string;
    }[];
    onFilter: (value: string | number | boolean, record: DataType) => boolean;
};
