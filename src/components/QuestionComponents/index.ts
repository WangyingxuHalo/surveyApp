import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// props type of each component
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

// configuration for every component
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// list that contains all components
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
