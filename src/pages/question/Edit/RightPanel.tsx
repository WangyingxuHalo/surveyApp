import React, { FC, useEffect, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}

const RightPanel: FC = () => {
  const [currActiveKey, setCurrActiveKey] = useState("");
  const { selectedId } = useGetComponentInfo();

  const handleTabClick = (keyToChange: string) => {
    setCurrActiveKey(keyToChange);
  };

  useEffect(() => {
    selectedId
      ? setCurrActiveKey(TAB_KEYS.PROP_KEY)
      : setCurrActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: (
        <div>
          <ComponentProp />
        </div>
      ),
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: (
        <div>
          <PageSetting />
        </div>
      ),
    },
  ];
  return (
    <Tabs
      activeKey={currActiveKey}
      items={tabItems}
      onChange={handleTabClick}
    ></Tabs>
  );
};

export default RightPanel;
