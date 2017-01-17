/**
 * Created by DAY on 12-09-2014.
 */
var appService=angular.module('applogicService',[]);
appService.service('logicService', function($http, $q) {
    return{
        graphConfigures :function (res,val,jsonUrl,$scope) {
            console.log('hai', val);
            if(val.options[0].type == 'area'){
              $scope.chartConfig[jsonUrl] = {
                            title: {
                                text: val.options[0].title
                            },
                            xAxis: {
                                gapGridLineWidth: 0
                            },
                            rangeSelector: {
                                buttons: [
                                    {
                                        type: val.options[0].buttons[0].type,
                                        count: val.options[0].buttons[0].count,
                                        text: val.options[0].buttons[0].text
                                    },
                                    {
                                        type: val.options[0].buttons[1].type,
                                        count: val.options[0].buttons[1].count,
                                        text: val.options[0].buttons[1].text
                                    },
                                    {
                                        type: val.options[0].buttons[2].type,
                                        count: val.options[0].buttons[2].count,
                                        text: val.options[0].buttons[2].text
                                    }
                                ],
                                selected: 1,
                                inputEnabled: false
                            },
                            series: [
                                {
                                    name: 'AAPL',
                                    type: val.options[0].type,
                                    data: res[0].data.Graphs[val.num].data,
                                    gapSize: 5,
                                    tooltip: {
                                        valueDecimals: 2
                                    },
                                    fillColor: {
                                        linearGradient: {
                                            x1: 0,
                                            y1: 0,
                                            x2: 0,
                                            y2: 1
                                        },
                                        stops: [
                                            [0, Highcharts.getOptions().colors[0]],
                                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                        ]
                                    },
                                    threshold: null
                                }
                            ]
                        }// chart Config
            } // if
            else if(val.options[0].type == 'arearange'){
                $scope.chartConfig[jsonUrl] = {
                    chart: {
                        type: 'arearange'
                    },
                    rangeSelector: {
                     inputEnabled: $('#chart1').width() > 480,
                        selected: 2
                    },
                    title: {
                        text: val.options[0].title
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                        valueSuffix: '°C'
                    },
                    series: [{
                        name: 'Temperatures',
                        data: res[0].data.Graphs[val.num].data
                    }]
                }//else if
            }
            else if(val.options[0].type == 'candlestick'){
                $scope.chartConfig[jsonUrl] = {
                    rangeSelector: {
                        inputEnabled: $('#chart1').width() > 480,
                        selected: 1
                    },
                    title: {
                        text: val.options[0].title
                    },

                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'OHLC'
                        },
                        height: '60%',
                        lineWidth: 2
                    }, {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Volume'
                        },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2
                    }],
                    series:[{
                        type: val.options[0].seriesVal[0].type,
                        name: val.options[0].seriesVal[0].name,
                        data: res[0].data.Graphs[val.num].data,
                        
                    }, {
                        type: val.options[0].seriesVal[1].type,
                        name: val.options[0].seriesVal[1].name,
                        data: res[0].data.Graphs[val.num].data,
                        yAxis: 1,

                    }]
                }

            }//else if
            else if(val.options[0].type == 'multiple'){
                $scope.chartConfig[jsonUrl] = {
                    rangeSelector: {
                        inputEnabled: $('#chart1').width() > 480,
                        selected: 4
                    },

                    yAxis: {
                        labels: {
                            formatter: function () {
                                return (this.value > 0 ? ' + ' : '') + this.value + '%';
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },

                    plotOptions: {
                        series: {
                            compare: 'percent'
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                        valueDecimals: 2
                    },

                    series: res[0].data.Graphs[val.num].data
                }
            }
        }
        };

});