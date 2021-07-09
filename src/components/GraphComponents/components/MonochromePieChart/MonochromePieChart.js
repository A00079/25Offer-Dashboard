import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MultiRadialPieChart = () => {

    const [series, setSeries] = useState([42, 47, 52, 58, 65]);
    const [options, setOptions] = useState(
        {
            chart: {
                width: 180,
                type: 'polarArea'
            },
            labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
            fill: {
                opacity: 1
            },
            stroke: {
                width: 1,
                colors: undefined
            },
            yaxis: {
                show: false
            },
            legend: {
                show: false,
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    },
                    spokes: {
                        strokeWidth: 0
                    },
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            }
        },
    );
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="polarArea" height={160} />
        </div>
    )
}

export default MultiRadialPieChart;

