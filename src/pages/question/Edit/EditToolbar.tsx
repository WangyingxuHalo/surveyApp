import React, { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteComponent,
  changeComponentHiddenStatus,
  toggleComponentLocked,
  copyComponent,
  pasteComponent,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { setIsUser } from "../../../store/userActionReducer";

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const dispatch = useDispatch();
  // delete component
  const handleDelete = () => {
    dispatch(deleteComponent());
    dispatch(setIsUser(true));
  };

  // hide component
  const handleHide = () => {
    dispatch(
      changeComponentHiddenStatus({ fe_id: selectedId, isHidden: true })
    );
    dispatch(setIsUser(true));
  };

  // lock component
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
    dispatch(setIsUser(true));
  };

  // copy component
  const handleCopy = () => {
    dispatch(copyComponent());
  };

  // paste component
  const handlePaste = () => {
    dispatch(pasteComponent());
    dispatch(setIsUser(true));
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHide}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
