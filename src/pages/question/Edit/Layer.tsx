import React, { ChangeEvent, FC, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import styles from "./Layer.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  changeSelectedId,
  changeTitleName,
  changeComponentHiddenStatus,
  toggleComponentLocked,
  moveComponentPosition,
} from "../../../store/componentsReducer";
import { Input, message, Button, Space } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import { setIsUser } from "../../../store/userActionReducer";

const Layer: FC = () => {
  const [changingTitleId, setChangingTitleId] = useState("");
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  const handleTitleClicked = (fe_id: string) => {
    setChangingTitleId(fe_id);
    const componentClicked = componentList.find(
      (component) => component.fe_id === fe_id
    );
    // if select hidden component
    if (componentClicked?.isHidden) {
      message.info("选中了隐藏的组件");
    }
    // if select component already selected
    if (componentClicked?.fe_id === selectedId) {
      setChangingTitleId(fe_id);
      return;
    }
    // select other component
    dispatch(changeSelectedId(fe_id));
    setChangingTitleId("");
  };

  // change title name
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    if (!newValue) {
      return;
    }
    if (!selectedId) {
      return;
    }
    dispatch(changeTitleName({ fe_id: selectedId, newTitle: newValue }));
    dispatch(setIsUser(true));
  };

  // change display or hidden
  const handleChangeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHiddenStatus({ fe_id, isHidden }));
    dispatch(setIsUser(true));
  };

  // change lock or unlock
  const handleChangeLock = (fe_id: string) => {
    dispatch(toggleComponentLocked({ fe_id }));
  };

  // need id for each item
  const componentListWithId = componentList.map((component) => {
    return { ...component, id: component.fe_id };
  });

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponentPosition({ oldIndex, newIndex }));
    dispatch(setIsUser(true));
  };

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map((component) => {
        const { fe_id, title, isHidden, isLocked } = component;
        const itemClassName = classNames({
          [styles.title]: true,
          [styles.selected]: selectedId === fe_id,
        });
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div key={fe_id} className={styles.wrapper}>
              <div
                className={itemClassName}
                onClick={() => {
                  handleTitleClicked(fe_id);
                }}
              >
                {changingTitleId === fe_id && (
                  <Input
                    value={title}
                    onPressEnter={() => setChangingTitleId("")}
                    onBlur={() => setChangingTitleId("")}
                    onChange={handleInputChange}
                  />
                )}
                {changingTitleId !== fe_id && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    className={isHidden ? "" : styles.btn}
                    onClick={() => {
                      handleChangeHidden(fe_id, !isHidden);
                    }}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    className={isLocked ? "" : styles.btn}
                    onClick={() => {
                      handleChangeLock(fe_id);
                    }}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layer;
