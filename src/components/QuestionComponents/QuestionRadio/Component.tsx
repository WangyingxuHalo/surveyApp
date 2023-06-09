import React, { FC } from "react";
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from "./interface";
import { Radio, Space, Typography } from "antd";

const { Title } = Typography;

const Component: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const {
    title,
    isVertical,
    options = [],
    value,
  } = {
    ...QuestionRadioDefaultProps,
    ...props,
  };
  return (
    <div>
      <Title style={{ fontSize: "16px" }}>{title}</Title>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((opt) => {
            const { value, text } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
