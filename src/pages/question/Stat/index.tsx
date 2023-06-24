import React, { FC, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { Spin, Result, Button } from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import StatHeader from "./StatHeader";
import LeftPanel from "./LeftPanel";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { isPublished } = useGetPageInfo();
  const nav = useNavigate();

  // 状态提升
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");

  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  function genContentElement() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          />
        </div>
      );
    }
    return (
      <>
        <div className={styles.left}>
          <LeftPanel
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        {loading && LoadingElem}
        {!loading && (
          <div className={styles.content}>{genContentElement()}</div>
        )}
      </div>
    </div>
  );
};

export default Stat;
