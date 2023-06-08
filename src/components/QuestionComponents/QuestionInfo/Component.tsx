import React, { FC } from "react";
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from "./interface";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, description } = {
    ...QuestionInfoDefaultProps,
    ...props,
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph style={{ whiteSpace: "pre-wrap" }}>{description}</Paragraph>
    </div>
  );
};

export default Component;
