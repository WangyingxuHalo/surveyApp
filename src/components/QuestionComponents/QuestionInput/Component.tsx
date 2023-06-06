import React, { FC } from "react";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";
import { Typography, Input } from "antd";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { title = "", placeholder = "" } = {
    ...QuestionInputDefaultProps,
    ...props,
  };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </>
  );
};

export default QuestionInput;
