import React, { FC } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_PATHNAME } from "../router";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
  const nav = useNavigate();

  const handleBackHome = () => {
    nav(HOME_PATHNAME);
  };

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
