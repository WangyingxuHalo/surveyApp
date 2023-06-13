import React, { FC, useMemo } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CHART_STAT_COLORS } from "../../../constant";
import { QuestionRadioStatPropsType } from "./interface";

function format(num: number) {
  return (num * 100).toFixed(2);
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  const sum = useMemo(() => {
    let s = 0;
    stat.forEach((ele) => (s += ele.count));
    return s;
  }, [stat]);

  return (
    <div
      style={{
        width: "350px",
        height: "400px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={400}>
          <Pie
            dataKey="count"
            isAnimationActive={true}
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(i) => `${i.name} ${format(i.count / sum)}%`}
          >
            {stat.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_STAT_COLORS[index % CHART_STAT_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
