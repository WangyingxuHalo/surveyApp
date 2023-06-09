import React, { FC } from "react";
import {
  QuestionCheckboxDefaultProps,
  QuestionCheckboxPropsType,
} from "./interface";
import { Typography, Space, Checkbox } from "antd";

const { Title } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const {
    title,
    isVertical,
    list = [],
  } = {
    ...QuestionCheckboxDefaultProps,
    ...props,
  };
  return (
    <div>
      <Title style={{ fontSize: "16px" }}>{title}</Title>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { text, value, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
