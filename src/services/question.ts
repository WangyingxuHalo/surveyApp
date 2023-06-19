import axios from "./ajax";
import type { ResDataType } from "./ajax";
import { HOST_ADDRESS } from "../constant";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

// Retrieve single survey information
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// Create a new survey
export async function createQuestionService(): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/question`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// Retrieve all survey list
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/question`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

// Enable users to star a survey
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

// Duplicate survey
export async function duplicateQuestionService(
  id: string
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// Delete a list of surveys
export async function deleteQuestionService(
  ids: string[]
): Promise<ResDataType> {
  const url = "${HOST_ADDRESS}/api/question";
  const data = (await axios.delete(url), { data: ids }) as ResDataType;
  return data;
}
