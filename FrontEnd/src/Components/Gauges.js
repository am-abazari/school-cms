import React from 'react';
import Chart from 'react-apexcharts'

const Gauges = (props) => {
    const homeworkChart = ({
        labels: [props.title],
        series: [Math.round(props.series)],
        chart: {
            foreColor: '#a7a8aa',
            fontFamily: 'shabnam',
            height: "230px",
            type: 'radialBar',

        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: props.size,
                }
            },
        },
        colors: [props.color],

        fill: {
            colors: [props.color],
            opacity: props.opacity,
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.3,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
                colorStops: []
            }
        },





    });
    return (
        <div className='w-full mt-2 pr-4'>
            <Chart options={homeworkChart} series={homeworkChart.series} type={homeworkChart.chart.type} height={homeworkChart.chart.height} />
        </div>
    );
};

export default React.memo(Gauges);