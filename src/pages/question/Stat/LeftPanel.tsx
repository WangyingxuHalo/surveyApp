import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import styles from "./LeftPanel.module.scss";
import classNames from "classnames";
import { ComponentInfoType } from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const currConf = getComponentConfByType(type);
  if (currConf == null) return null;
  const { Component } = currConf;
  return <Component {...props} />;
}

const LeftPanel: FC<PropsType> = (props: PropsType) => {
  const { componentList } = useGetComponentInfo();
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;

  const handleClick = (id: string, type: string) => {
    setSelectedComponentId(id);
    setSelectedComponentType(type);
  };

  return (
    <div className={styles.container}>
      {componentList
        .filter((each) => !each.isHidden)
        .map((component, index) => {
          const { fe_id, type } = component;
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedComponentId === fe_id, // selectedId == fe_id?
          });
          return (
            <div
              key={index}
              className={wrapperClassName}
              onClick={() => handleClick(fe_id, type)}
            >
              <div className={styles.component}>{genComponent(component)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftPanel;
