import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";

const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData();
  const dispatch = useDispatch();

  const handleCancelFocus = () => {
    dispatch(changeSelectedId(""));
  };

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: "40px" }}>header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main} onClick={handleCancelFocus}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
