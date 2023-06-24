import { useRequest } from "ahooks";
import React, { FC, useState } from "react";
import {
  getQuestionListInStatService,
  getQuestionListService,
} from "../../../services/stat";
import { useParams } from "react-router-dom";
import { Form, Spin, Typography, Table, Pagination } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE } from "../../../constant";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = "" } = useParams();
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

  const { componentList } = useGetComponentInfo();
  const columns = componentList.map((c) => {
    const { fe_id, title, props = {}, type } = c;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const colTitle = props!.title || title;
    return {
      title: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span
            style={{
              color: fe_id === selectedComponentId ? "#1890ff" : "inherit",
            }}
          >
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  // Data source used requires a unique key
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((data: any) => ({ ...data, key: data._id }));
  const TableElem = (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      ></Table>
      <div style={{ textAlign: "center", marginTop: "18px" }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionListInStatService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        console.log("res: ", res);
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    }
  );
  return (
    <div>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {!loading && (
        <div>
          <div>
            <Title>答卷数量: {total}</Title>
          </div>
          <div>
            <Form></Form>
          </div>
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};

export default PageStat;
