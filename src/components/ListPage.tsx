import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const [currPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const { total } = props;

  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrentPage(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;

    setPageSize(pageSize);
  }, [searchParams]);

  const onPageChange: PaginationProps["onChange"] = (
    pageNumber: number,
    pageSize: number
  ) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, pageNumber.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <Pagination
      current={currPage}
      pageSize={pageSize}
      total={total}
      onChange={onPageChange}
    />
  );
};

export default ListPage;
