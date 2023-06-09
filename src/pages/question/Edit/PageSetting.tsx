import { Form, Input } from "antd";
import React, { FC, useEffect } from "react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../store/pageInfoReducer";

const { TextArea } = Input;

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()));
  };

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  return (
    <div>
      <Form
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleValuesChange}
        form={form}
      >
        <Form.Item
          label="页面标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="页面描述" name="desc">
          <Input placeholder="请输入页面描述" />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea placeholder="请输入CSS样式代码" />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <Input placeholder="请输入脚本代码" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PageSetting;
