import React, { FC } from "react";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography;

const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };

  return (
    <Paragraph
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: "0",
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </Paragraph>
  );
};

export default Component;
