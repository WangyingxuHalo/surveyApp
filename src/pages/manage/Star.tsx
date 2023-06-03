import React, { FC, useState } from "react";
import { Typography, Empty, Spin, Pagination } from "antd";
import styles from "./Common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const { Title } = Typography;

// const rawQuestionList = [
//   {
//     _id: "q1",
//     title: "问卷1",
//     isPublished: true,
//     isStar: false,
//     answerCount: 5,
//     createdAt: "3月10日13点23分",
//   },
//   {
//     _id: "q2",
//     title: "问卷2",
//     isPublished: false,
//     isStar: true,
//     answerCount: 8,
//     createdAt: "3月12日15点23分",
//   },
//   {
//     _id: "q3",
//     title: "问卷3",
//     isPublished: true,
//     isStar: false,
//     answerCount: 2,
//     createdAt: "3月14日17点23分",
//   },
//   {
//     _id: "q4",
//     title: "问卷4",
//     isPublished: false,
//     isStar: false,
//     answerCount: 4,
//     createdAt: "3月16日19点23分",
//   },
// ];

const Star: FC = () => {
  const {
    loading,
    data = {},
    error,
  } = useLoadQuestionListData({ isStar: true });
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
