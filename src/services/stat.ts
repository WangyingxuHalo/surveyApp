import axios, { ResDataType } from "./ajax";
import { HOST_ADDRESS } from "../constant";

export async function getQuestionListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

export async function getQuestionListInStatService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/stat/tob/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

export async function getComponentStatService(
  questionId: string,
  componentId: string,
  selectedComponentType: string
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/stat/tob/${questionId}${"/" + componentId}${
    "/" + selectedComponentType
  }`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
