import React, { FC, useEffect } from "react";
import { QuestionCheckboxPropsType } from "./interface";
import { Form, Input, Checkbox, Button, Space } from "antd";
import { OptionType } from "./interface";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const [form] = Form.useForm();
  const { title, isVertical, list, onChange, disabled = false } = props;

  const handleValuesChange = () => {
    if (onChange) {
      const newValues = form.getFieldsValue();
      const { list = [] } = newValues;
      list.forEach((opt: OptionType) => {
        if (opt.value) {
          return;
        }
        opt.value = nanoid(5);
      });
      onChange(newValues);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list });
  }, [title, isVertical, list]);
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* traverse all options */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, "checked"]} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            // Check if there are values that are the same
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++;
                            });
                            if (num === 1) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("和其他选项重复"));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>
                    {index > 0 && (
                      <Button
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => {
                          remove(name);
                        }}
                      ></Button>
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
