import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = (props) => {

    const lineChartData = {
        colors: ["#f0f"],
        series: [{
            name: props.name,
            data: props.data
        }],
        
        options: {
            colors:[props.colors],
            chart: {
                toolbar: {
                    show: false
                },
                foreColor: '#a7a8aa',
                fontFamily: 'shabnam',
                height: props.height,
                type: 'area',
                zoom: {
                    enabled: true
                },
            },
            dataLabels: {
                enabled: true,
                background: {
                    enabled: true,
                    foreColor: '#EFEEFC',
                    padding: 6,
                    borderRadius: 500,
                    borderWidth: 0,
                    borderColor: '#283046',
                    opacity: 1,
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 1,
                        blur: 1,
                        opacity: 0.1
                    }
                },
            },
            stroke: {
                curve: props.curv,
            },
            tooltip: {
                theme: "dark"
            },


            grid: {
                show: true,
                borderColor: '#90A4AE',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
                row: {
                    colors: false,
                    opacity: 1
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: props.paddingLeft
                },
            },

            xaxis: {
                categories: props.cat,
            },
            yaxis: {
                // show:false,
                max: props.max,
                min: 0,
                tickAmount: 5,
            }
        },
        
    };


    return (
        <div className='mr-6 pt-2'>
            <ReactApexChart width={"100%"} options={lineChartData.options} series={lineChartData.series} type={lineChartData.options.chart.type} height={lineChartData.options.chart.height} />

        </div>
    );
};

export default LineChart;