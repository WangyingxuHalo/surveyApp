/**
 * @description survey textarea
 * @author Yingxu
 */

import Component from "./Component";
import { QuestionTextareaDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

// Configuration of survey textarea component
export default {
  title: "输入框",
  type: "questionTextarea",
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
};
