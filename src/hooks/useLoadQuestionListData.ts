import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from "../constant";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar = false, isDeleted = false } = opt;
  const [searchParams] = useSearchParams();
  async function loadAllList() {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    const data = await getQuestionListService({
      keyword,
      isStar,
      isDeleted,
      page,
      pageSize,
    });
    return data;
  }
  const { data, loading, error, refresh } = useRequest(loadAllList, {
    refreshDeps: [searchParams],
  });

  return { data, loading, error, refresh };
}

export default useLoadQuestionListData;
