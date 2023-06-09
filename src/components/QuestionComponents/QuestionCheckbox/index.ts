/**
 * @description survey question checkbox component configuration
 * @author Yingxu
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
import { QuestionCheckboxDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "多选框",
  type: "questionCheckbox",
  Component,
  PropComponent,
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps,
};
