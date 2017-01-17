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
                $scope.chartConfig[jsonUrl] ='StockChart', {
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
                }
            }
            else if(val.options[0].type == 'arearange'){

            }
        }
        };

});