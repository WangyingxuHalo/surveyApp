import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  getComponentConfByType,
  ComponentPropsType,
} from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();
  if (selectedComponent == null) {
    return <NoProp />;
  }
  const { type, props, isLocked } = selectedComponent;
  const currConf = getComponentConfByType(type);
  if (currConf == null) {
    return <NoProp />;
  }

  const changeProps = (newProps: ComponentPropsType) => {
    if (selectedComponent == null) {
      return;
    }
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  };

  const { PropComponent } = currConf;
  return (
    <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
  );
};

export default ComponentProp;
