/**
 * @description survey title
 * @author Yingxu
 */

import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

// Configuration of question title component
export default {
  title: "输入框",
  type: "questionTitle",
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
};
