import React, { useEffect } from 'react';
import { Donut } from 'britecharts-react';
const donutData = require('./donutChart.fixtures.js').default;

const DonutChart = () => {
    const logMouseOver = () => console.log('Mouse Over');
    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName("britechart donut-chart")[0].removeAttribute("width");
            document.getElementsByClassName("britechart donut-chart")[0].removeAttribute("height");
            document.getElementsByClassName("container-group")[0].setAttribute("transform", "translate(160, 80)");
        }, 1500);
    }, []);

    return (
        <Donut
            data={donutData.with4Slices()}
            customMouseOver={logMouseOver}
            externalRadius={70}
            internalRadius={40}
            highlightSliceById={1}
        />
    )
}

export default DonutChart;