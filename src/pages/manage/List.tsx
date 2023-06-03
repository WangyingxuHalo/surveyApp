import React, { FC } from "react";
import styles from "./Common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Spin, Typography, Empty } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

const { Title } = Typography;

const List: FC = () => {
  const { loading, data = {}, error } = useLoadQuestionListData({});
  const { list: questionList = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
          questionList.length > 0 &&
          questionList.map((eachQuestion: any) => {
            const { _id } = eachQuestion;
            return <QuestionCard key={_id} {...eachQuestion} />;
          })}
      </div>
      <div className={styles.footer}>Load more...</div>
    </>
  );
};

export default List;
