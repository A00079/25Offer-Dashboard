import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MultiRadialPieChart = () => {

    const [series, setSeries] = useState([43, 11, 67, 504, 70, 67]);
    const [options, setOptions] = useState(
        {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '14px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        // total: {
                        //     show: true,
                        //     label: 'Total',
                        //     formatter: function (w) {
                        //         // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        //         return 249
                        //     }
                        // }
                    }
                }
            },
            labels: ['Total Offers', 'Active Offers', 'Pending Applications', 'Total Affiliates', 'Active Affiliates', 'Pending Affiliates'],
        },
    );
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" height={350} />
        </div>
    )
}

export default MultiRadialPieChart;

