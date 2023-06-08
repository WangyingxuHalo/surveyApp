import React, { FC } from "react";
import {
  componentConfGroup,
  ComponentConfType,
} from "../../../components/QuestionComponents";
import { Typography } from "antd";
import styles from "./ComponentLibrary.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentsReducer";
import { nanoid } from "nanoid";

const { Title } = Typography;

const genComponent = (c: ComponentConfType) => {
  const dispatch = useDispatch();
  const { title, type, Component, defaultProps } = c;
  const handleAddComponent = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  };

  return (
    <div key={type} className={styles.wrapper} onClick={handleAddComponent}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
};

const Lib: FC = () => {
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}
            >
              {groupName}
            </Title>
            <div>
              {components.map((component) => {
                return genComponent(component);
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lib;
