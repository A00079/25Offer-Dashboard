import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SplineChart = () => {

    const [series, setSeries] = useState([14, 23, 21, 17, 15, 10, 12, 17, 21]);
    const [options, setOptions] = useState(
        {
            chart: {
                type: 'polarArea',
            },
            stroke: {
                colors: ['#fff']
            },
            fill: {
                opacity: 0.8
            },
            legend: {
                show: false,
                position: 'bottom',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: false,
                        position: 'bottom',
                    }
                }
            }]
        },
    );
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="polarArea" height={160} />
        </div>
    )
}

export default SplineChart;

