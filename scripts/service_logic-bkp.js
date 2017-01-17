/**
 * Created by DAY on 12-09-2014.
 */
var appService=angular.module('applogicService',[]);
appService.service('logicService', function($http, $q) {
    return{
        graphConfigures: function (res, val, jsonUrl, $scope, indGrid) {
            var chartId = '#container' + indGrid;
            console.log('index is ', indGrid);

            var ohlc = [],
                volume = [],
                dataLength = res[0].data.Graphs[val.num].data.length,
            // set the allowed units for data grouping
                groupingUnits = [
                    [
                        'week',                         // unit name
                        [1]                             // allowed multiples
                    ],
                    [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]
                ]
            i = 0;
            var seriesData = [];
            seriesData.push({data: ohlc}, {data: volume});
            var innerSeries = [];
            var yAxisArray = [];
            var title = [];
            var series;
            var dateArr = [];
            var valArr = [];
            var arr;
            var fLength;
            var k = 0;
            var l = 0;
            var flagVar ;
            var tempArr = [];
            var indv_hgt = 100 / val.options[0].seriesVal.length;
            var top = 0;
            for (var i = 0; i < val.options[0].seriesVal.length; i++) {
                 var dataLen =  res[0].data.Graphs[val.num].data.length;
                    for(var j ; j<dataLen;j++){
                        var flagLen = val.options[0].seriesVal[i].flags.length;
                        for(var k=0;k<flagLen;k++){
                        flagVar  = val.options[0].seriesVal[i].flags[k];
                        console.log('flag var ',flagVar);
                            seriesData.push([res[0].data.Graphs[val.num].data[j].flagVar])
                        }
                    }
                title = val.options[0].seriesVal[i].yAxis[1].title[0].text;
                series = val.options[0].seriesVal[i].yAxis[1].title[0].text;
                yAxisArray.push({labels: {align: 'right', x: -3},
                    title: {text: title},
                    height: indv_hgt + '%',
                    top: top + '%',
                    lineWidth: 2});
                innerSeries.push({
                    type: val.options[0].seriesVal[i].series[0].type,
                    name: val.options[0].seriesVal[i].series[3].fields,
                    data: seriesData,
                    yAxis: val.options[0].seriesVal[i].series[2].yAxis,
                    dataGrouping: {units: groupingUnits}
                });
                top = top + indv_hgt;
            }




            angular.element(chartId).highcharts('StockChart', {
                rangeSelector: {
                    inputEnabled: $(chartId).width() > 480,
                    selected: 1
                },
                title: {
                    text: 'AAPL Historical'
                },
                yAxis: yAxisArray,
                plotOptions: {
                    series: {
                        compare: 'percent'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 2
                },
                series: innerSeries
            });




           }
        }

});
