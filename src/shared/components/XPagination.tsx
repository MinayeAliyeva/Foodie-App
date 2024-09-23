import { FC } from "react";
import { Pagination } from "antd";


interface IProps {
  data?: any[];
  getPageData?: (page: number) => void;
}
const XPagination: FC<IProps> = ({ data, getPageData }) => {
  const handleChangePagination = (page: any) => {
    getPageData?.(page);
  };
  return (
    <>
      <Pagination
        onChange={handleChangePagination}
        total={50}
      />
    </>
  );
};

export default XPagination;
