import React, { FC } from "react";
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from "./interface";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  const { title = "", placeholder = "" } = {
    ...QuestionTextareaDefaultProps,
    ...props,
  };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <TextArea placeholder={placeholder}></TextArea>
    </>
  );
};

export default QuestionTextarea;
