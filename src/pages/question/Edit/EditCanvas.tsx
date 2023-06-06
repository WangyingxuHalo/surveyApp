import React, { FC, MouseEvent } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import classNames from "classnames";

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

  if (loading) {
    return <Spin />;
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((component) => {
        const { fe_id } = component;

        const wrapperDefaultClassName = styles["component-wrapper"];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: selectedId === fe_id, // selectedId == fe_id?
        });

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={(e) => handelClick(e, fe_id)}
          >
            <div className={styles.component}>{genComponent(component)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
