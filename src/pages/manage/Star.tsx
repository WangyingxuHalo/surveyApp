import React, { FC } from "react";
import { Typography, Empty, Spin } from "antd";
import styles from "./Common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const { Title } = Typography;

const Star: FC = () => {
  const { loading, data = {} } = useLoadQuestionListData({ isStar: true });
  const { list: questionList = [], total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && questionList.length === 0 && (
          <Empty description="暂无数据" />
        )}
        {!loading &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          questionList.map((eachQuestion: any) => {
            const { _id } = eachQuestion;
            return <QuestionCard key={_id} {...eachQuestion} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
