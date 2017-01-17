/**
 * Created by DAY on 12-09-2014.
 */
var appService=angular.module('applogicService',[]);
appService.service('logicService', function($http, $q,$timeout) {
    return{
        graphConfigures :function (res,val,jsonUrl,$scope,indGrid) {
       //     var chartId = '#container'+val.options[0].graphNum;
            var chartId = '#container'+indGrid;
           // console.log('index is ',indGrid);
            if(val.options[0].type  == 'flag' ){
                angular.element(chartId).highcharts('StockChart', {
                    rangeSelector: {
                        inputEnabled: $(chartId).width() > 480,
                        selected: 1
                    },
                    title: {
                        text: val.options[0].title
                    },
                    yAxis: {
                        title: {
                            text: 'Exchange rate'
                        }
                    },
                    series: [{
                        name: 'USD to EUR',
                        data: res[0].data.Graphs[val.num].data,
                        id: 'dataseries',
                        tooltip: {
                            valueDecimals: 4
                        }
                    }, {
                        type: 'flags',
                        name: 'Flags on series',
                        data: [{
                            x: Date.UTC(2011, 1, 22),
                            title: 'On series'
                        }, {
                            x: Date.UTC(2011, 3, 28),
                            title: 'On series'
                        }],
                        onSeries: 'dataseries',
                        shape: 'squarepin'
                    }, {
                        type: 'flags',
                        name: 'Flags on axis',
                        data: [{
                            x: Date.UTC(2011, 2, 1),
                            title: 'On axis'
                        }, {
                            x: Date.UTC(2011, 3, 1),
                            title: 'On axis'
                        }],
                        shape: 'squarepin'
                    }]
                });
            } // if
            else if(val.options[0].type == 'arearange'){
                angular.element(chartId).highcharts('StockChart',{
                    chart: {
                        type: 'arearange'
                    },
                    rangeSelector: {
                        inputEnabled: $(chartId).width() > 480,
                        selected: 2
                    },
                    title: {
                        text: 'Temperature variation by day'
                    },
                    tooltip: {
                        valueSuffix: '°C'
                    },
                    series: [{
                        name: 'Temperatures',
                        data: res[0].data.Graphs[val.num].data
                    }]
                });
            }
            else if(val.options[0].type == 'candlestick'){

                    dataLength = res[0].data.Graphs[val.num].data[0].length,
                // set the allowed units for data grouping
                    groupingUnits = [[
                        'week',                         // unit name
                        [1]                             // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]]
                i = 0;
                var seriesData = [];
                var innerSeries = [];
                var yAxisArray = [];
                var title =  [];
                var series;
                var dateArr = [];
                var valArr = [];
                var arr="";
                var fLength;
                var k = 0;
                var l = 0;
                var tempArr = [];
                var flagName;
                var indv_hgt=100/val.options[0].seriesVal.length;
                var top = 0;
                //Loop # Series.
                for(var i = 0; i < val.options[0].seriesVal.length; i++) {
                    //Array of series data.
                    var seriesValue = [];
                    var candleLen = res[0].data.Graphs[val.num].data[0].length;
                    var fields = val.options[0].seriesVal[i].series[3].fields;
                    //Loop  Total
                    for (j = 0; j < candleLen; j++) {
                        var row = new Array();
                        for (k = 0; k < fields.length; k++) {
                            flagName = fields[k];
                            arr = res[0].data.Graphs[val.num].data[0][j][flagName];
                            row.push(arr);
                        }
                        seriesValue [j] = row;
                    }
                    seriesData[i] = seriesValue;
                    title = val.options[0].seriesVal[i].yAxis[1].title[0].text;
                    series = val.options[0].seriesVal[i].yAxis[1].title[0].text;
                    yAxisArray.push({labels: {align: 'right', x: -3},
                        title: {text: title},
                        height: indv_hgt + '%',
                        top: top + '%',
                        lineWidth: 2});

                    innerSeries.push({
                        type: val.options[0].seriesVal[i].series[0].type,
                        name: val.options[0].seriesVal[i].series[1].name,
                        data: seriesData[i],
                        yAxis: val.options[0].seriesVal[i].series[2].yAxis,
                        dataGrouping: {units: groupingUnits}
                    });
                    top = top + indv_hgt;
                }
                angular.element(chartId).highcharts('StockChart',{
                    rangeSelector: {
                        inputEnabled: $(chartId).width() > 480,
                        selected: 1
                    },
                    title: {
                        text: 'AAPL Historical'
                    },
                    yAxis: yAxisArray,
                    series: innerSeries
                });
            }//else if
            else if(val.options[0].type == 'multiple'){

                var seriesOptions = [],
                    seriesCounter = 0,
                    dataList = [],
                    tempArr = [],
                    names = val.options[0].seriesVal[0].series[0].fields,
                    candleLen = res[0].data.Graphs[val.num].data[0].length;
                
                var dataValues = {};
                for(j=0;j<candleLen;j++) {
                    
                    for (i = 0; i < names.length; i++) {
                        flagName = names[i];
                        arr = res[0].data.Graphs[val.num].data[0][j][flagName];
                        if (!dataValues[flagName]) {
                            dataValues[flagName] = new Array();
                        }
                        dataValues[flagName].push (arr);
                    }
                }
                var i = 0;
                $.each(dataValues, function (data, name) {
                    seriesOptions[i++] = {
                        name: name,
                        data: data
                    };
                });
                // create the chart when all data is loaded
                angular.element(chartId).highcharts('StockChart',{
                    rangeSelector: {
                        inputEnabled: $(chartId).width() > 480,
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
                    series: seriesOptions
                });
            }
        }
        };

});