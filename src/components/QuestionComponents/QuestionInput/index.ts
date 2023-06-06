/**
 * @description survey input
 * @author Yingxu
 */

import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";

export * from "./interface";

// Configuration of survey input component
export default {
  title: "输入框",
  type: "questionInput",
  Component,
  defaultProps: QuestionInputDefaultProps,
};
