import React, { FC } from "react";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { Typography } from "antd";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  // has default value, ...props will cover previous value
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (level: number) => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
  };

  return (
    <>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? "center" : "start",
          marginBottom: "0",
          fontSize: genFontSize(level),
        }}
      >
        {text}123
      </Title>
    </>
  );
};

export default QuestionTitle;
