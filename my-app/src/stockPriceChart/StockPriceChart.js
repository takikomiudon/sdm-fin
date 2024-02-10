import { BarChart } from '@mui/x-charts/BarChart';

const StockPriceChart = () => {
    return (
        <div>
            <h1>現在の株価</h1>
            <BarChart
                series={[
                    { data: [35, 35, 35, 35, 35], stack: 'A', color: '#282c34'}, // ここを変化させて株価の変化を表現しよう
                    { data: [10, 10, 10, 10, 10], stack: 'A'},
                    { data: [10, 10, 10, 10, 10], stack: 'A'},
                ]}
                width={600}
                height={1000}
                xAxis={[
                    {
                        scaleType: 'band',
                        data: ['Stock1', 'Stock2', 'Stock3', 'Stock4', 'Stock5'],
                    }
                ]}
                yAxis={[
                    { max: 480 }
                ]}
                sx={{
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                        fill:"#ffffff"
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        fill:"#ffffff"
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                        stroke:"#ffffff",
                    },
                    "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                        stroke:"#ffffff",
                    },
                    "& .MuiChartsAxis-root .MuiChartsAxis-tick":{
                        stroke:"#ffffff",
                    },
                }}
            />
        </div>
    );
}

export default StockPriceChart;