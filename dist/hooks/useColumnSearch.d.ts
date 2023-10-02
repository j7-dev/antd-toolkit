import type { ColumnType } from "antd/es/table";
export declare const useColumnSearch: <DataType, DataIndex extends string & keyof DataType>() => {
    getColumnSearchProps: (dataIndex: DataIndex) => ColumnType<DataType>;
};
