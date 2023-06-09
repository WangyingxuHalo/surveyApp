import React, { FC, useEffect } from "react";
import { QuestionRadioPropsType } from "./interface";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { OptionType } from "./interface";
import { nanoid } from "nanoid";

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const [form] = Form.useForm();
  const { title, isVertical, options = [], value, onChange, disabled } = props;
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value });
  }, [title, isVertical, options, value]);

  const handleValuesChange = () => {
    if (onChange) {
      const newValues = form.getFieldsValue();
      const { options } = newValues;
      options.forEach((opt: OptionType) => {
        if (opt.value) {
          return;
        }
        opt.value = nanoid(5);
      });
      onChange(newValues);
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValuesChange}
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
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* traverse all options */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            // Check if there are values that are the same
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: OptionType) => {
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
                    {index > 1 && (
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
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({
            value,
            label: text || "",
          }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
