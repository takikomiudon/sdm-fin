import { BarChart } from "@mui/x-charts/BarChart";

const StockPriceChart = () => {
  // 下向くん
  // まずグラフの描画に必要な情報を取得し、グラフに反映するようにする
  // 現状はMUIのBarChartというものを用いて無理やり描画しているが、これだと上にいくにつれて上がり幅が増えるのが表現できていないため、他に良さそうなライブラリあるいは表現方法があれば教えてください
  return (
    <div>
      <h1>現在の株価</h1>
      <BarChart
        series={[
          { data: [35, 35, 35, 35, 35], stack: "A", color: "#282c34" }, // ここを変化させて株価の変化を表現しよう
          { data: [10, 10, 10, 10, 10], stack: "A" },
          { data: [10, 10, 10, 10, 10], stack: "A" },
        ]}
        width={600}
        height={1000}
        xAxis={[
          {
            scaleType: "band",
            data: ["Stock1", "Stock2", "Stock3", "Stock4", "Stock5"],
          },
        ]}
        yAxis={[{ max: 480 }]}
        sx={{
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            fill: "#ffffff",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            fill: "#ffffff",
          },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "#ffffff",
          },
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "#ffffff",
          },
          "& .MuiChartsAxis-root .MuiChartsAxis-tick": {
            stroke: "#ffffff",
          },
        }}
      />
    </div>
  );
};

export default StockPriceChart;
