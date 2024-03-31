import React from "react";

const GameYearAndPeriod = ({
  year,
  period,
}: {
  year: number;
  period: number;
}) => {
  return (
    <div>
      <h1>
        {year}年目第{period}期
      </h1>
    </div>
  );
};

export default GameYearAndPeriod;
