import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Stat: FC = () => {
  // const { loading, data, error } = useLoadQuestionData();
  return (
    <div>
      <p>Stat page</p>
      {/* {loading ? <p>loading</p> : <p>finish loading</p>} */}
      {/* <div>{JSON.stringify(data)}</div> */}
    </div>
  );
};

export default Stat;
