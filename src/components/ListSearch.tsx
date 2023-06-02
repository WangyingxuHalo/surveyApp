import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { LIST_SEARCH_PARAM_KEY } from "../constant/index";

const { Search } = Input;

const ListSearch: FC = () => {
  const [searchContent, setSearchContent] = useState("");
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setSearchContent(newVal);
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
  };

  const handleSearch = (value: string) => {
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };
  return (
    <>
      <Search
        placeholder="输入问卷关键字"
        onSearch={handleSearch}
        value={searchContent}
        onChange={handleSearchChange}
        style={{ width: "230px" }}
        allowClear
      />
    </>
  );
};

export default ListSearch;
