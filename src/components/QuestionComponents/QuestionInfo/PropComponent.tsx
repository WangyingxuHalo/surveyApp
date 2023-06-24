import React, { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title, description, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, description });
  }, [title, description]);

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ title, description }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="description">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
