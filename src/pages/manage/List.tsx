import React, { FC, useState } from "react";
import styles from "./List.module.scss";
import QuestionCard from "../../components/QuestionCard";

const List: FC = () => {
  const [questionList, setQuestionList] = useState([
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
  ]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>
          <p>搜索框</p>
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map((eachQuestion) => {
          const { _id } = eachQuestion;
          return <QuestionCard key={_id} {...eachQuestion} />;
        })}
      </div>
      <div className={styles.footer}>底部</div>
    </>
  );
};

export default List;
