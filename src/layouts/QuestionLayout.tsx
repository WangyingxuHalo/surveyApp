import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import { Spin } from "antd";

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <div style={{ height: "100vh" }}>
      <div>QuestionLayout</div>
      {waitingUserData ? (
        <div style={{ textAlign: "center", marginTop: "200px" }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
