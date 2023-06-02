import React, { FC } from "react";
import styles from "./Common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Typography } from "antd";
import ListSearch from "../../components/ListSearch";

const { Title } = Typography;

const questionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "3月10日13点23分",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: true,
    answerCount: 8,
    createdAt: "3月12日15点23分",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: false,
    answerCount: 2,
    createdAt: "3月14日17点23分",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: false,
    isStar: false,
    answerCount: 4,
    createdAt: "3月16日19点23分",
  },
];

const List: FC = () => {
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
        {questionList.map((eachQuestion) => {
          const { _id } = eachQuestion;
          return <QuestionCard key={_id} {...eachQuestion} />;
        })}
      </div>
      <div className={styles.footer}>Load more...</div>
    </>
  );
};

export default List;
