import React, { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import PieDemo from "./PieDemo";
import BarDemo from "./BarDemo";
import { getComponentStatService } from "../../../services/stat";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getComponentConfByType } from "../../../components/QuestionComponents";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props;
  const { id = "" } = useParams();
  const [statData, setStatData] = useState([]);
  const { run } = useRequest(
    async (id, selectedComponentId) =>
      await getComponentStatService(id, selectedComponentId),
    {
      manual: true,
      onSuccess(res) {
        setStatData(res.stat);
      },
    }
  );

  useEffect(() => {
    run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  function genStatElem(type: string) {
    if (!selectedComponentId) return <div>未选中组件</div>;
    const conf = getComponentConfByType(type);
    if (!conf) {
      return <div>选中组件不存在</div>;
    }
    const { StatComponent } = conf;
    if (!StatComponent) {
      return <div>不支持非单选框，多选框的数据统计</div>;
    }

    return (
      <>
        <StatComponent stat={statData} />
      </>
    );
  }
  return (
    <div>
      <Title>图表统计</Title>
      <div>{genStatElem(selectedComponentType)}</div>
    </div>
  );
};

export default ChartStat;
