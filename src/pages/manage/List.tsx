/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./Common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Spin, Typography, Empty } from "antd";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest } from "ahooks";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography;

const List: FC = () => {
  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [startLoading, setStartLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const haveMoreData = total > questionList.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  useEffect(() => {
    setPage(1);
    setTotal(0);
    setQuestionList([]);
    setStartLoading(false);
  }, [keyword]);

  const { loading, run: loadReq } = useRequest(
    async () => {
      const data = await getQuestionListService({
        keyword,
        page,
        pageSize: LIST_PAGE_SIZE,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list = {}, total = 0 } = result;
        setQuestionList(questionList.concat(list));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) {
        return;
      }
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) {
        return;
      }
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        loadReq();
        setStartLoading(true);
      }
    },
    {
      wait: 1000,
    }
  );

  // When search keyword changes, try load new content
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // When scroll down to the bottom, try load more
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  // LoadMore elem
  const LoadMoreContentElem = () => {
    if (!startLoading || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了</span>;
    return <span>加载下一页</span>;
  };

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
        {questionList.map((eachQuestion: any) => {
          const { _id } = eachQuestion;
          return <QuestionCard key={_id} {...eachQuestion} />;
        })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  );
};

export default List;
