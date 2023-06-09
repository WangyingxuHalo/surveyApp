import React, { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponentPosition,
} from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const currConf = getComponentConfByType(type);
  if (currConf == null) return null;
  const { Component } = currConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();

  const handelClick = (event: MouseEvent, id: string) => {
    // Stop parent action
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  };

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponentPosition({ oldIndex, newIndex }));
  };

  useBindCanvasKeyPress();

  if (loading) {
    return <Spin />;
  }

  // need id for each item
  const componentListWithId = componentList.map((component) => {
    return { ...component, id: component.fe_id };
  });

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((component) => {
            const { fe_id, isLocked } = component;

            const wrapperDefaultClassName = styles["component-wrapper"];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: selectedId === fe_id, // selectedId == fe_id?
              [lockedClassName]: isLocked,
            });

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handelClick(e, fe_id)}
                >
                  <div className={styles.component}>
                    {genComponent(component)}
                  </div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
