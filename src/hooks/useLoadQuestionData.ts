import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  // ajax request
  const { run, data, loading, error } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error("没有问卷id");
      }
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const { title, componentList } = data;
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    dispatch(resetComponents({ componentList, selectedId }));
  }, [data]);

  // id changes => send ajax request to load survey data
  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };

  //   async function load() {
  //     const data = await getQuestionService(id);
  //     return data;
  //   }

  //   const { loading, data, error } = useRequest(load);
  //   return { loading, data, error };
}

export default useLoadQuestionData;
