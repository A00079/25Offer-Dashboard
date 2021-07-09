import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MultiRadialPieChart = () => {

    const [series, setSeries] = useState([76, 67, 61, 90,57,29]);
    const [options, setOptions] = useState(
        {
            chart: {
                height: 260,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    }
                }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            labels: ['Total Offers', 'Active Offers', 'Pending Applications', 'Total Affiliates', 'Active Affiliates', 'Pending Affiliates'],
            legend: {
                show: true,
                floating: true,
                fontSize: '14px',
                position: 'left',
                offsetX: 160,
                offsetY: 0,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0
                },
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
                itemMargin: {
                    vertical: 3
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },
    );
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" height={200} />
        </div>
    )
}

export default MultiRadialPieChart;

