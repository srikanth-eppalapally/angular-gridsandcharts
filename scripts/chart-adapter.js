/**
 * Created by DAY on 12-09-2014.
 */
var adapterService = angular.module('adapterService', []);
adapterService
		.service(
				'chartService',
				function($http, $q) {
					return {
						graphConfigures : function(res, val, jsonUrl, $scope,
								indGrid) {
							var chartId = '#container' + indGrid;
							var seriesData = [], seriesOptions = [], innerSeries = [], yAxisArray = [], dataList = [], title = [], seriesCounter = 0, top = 0, y = 0, tempArr = "", fieldLen, fields, series = [],minVal ,
                            maxVal ,plotLines = [],forMat,interval;
							groupingUnits = [ [ 'week', [ 1 ] ],
									[ 'month', [ 1, 2, 3, 4, 6 ] ] ]
							j = 0;
							var indv_hgt = 100 / val.options.length;
                        var optLen = val.options.length;
							for ( var i = 0; i < optLen; i++) {
                                interval = null;
                                var seriesValue = [];
                                var candleLen = res[0].data.data.length;
                                console.log('i is ', i);
                                var fieldName = val.options[i].field;
                                var dataValues = {};
                                for (j = 0; j < candleLen; j++) {
                                    var row = new Array();
                                    row.push(res[0].data.data[j].date);
                                    for (k = 0; k < fieldName.length; k++) {
                                        fields = fieldName[k];
                                        tempArr = res[0].data.data[j][fields];
                                        if (!dataValues[fields]) {
                                            dataValues[fields] = new Array();
                                        }
                                        row.push(tempArr);
                                        dataValues[fields].push([res[0].data.data[j].date, tempArr]);
                                    }
                                    seriesValue[j] = row;
                                }
                                seriesData[i] = seriesValue;
                                title = val.options[i].yaxisTitle;
                                series = val.options[i].type;
                                yAxisArray.push({
                                    labels: {
                                        align: 'right',
                                        x: -3,
                                        formatter:forMat
                                    },
                                    title: {
                                        text: title
                                    },

                                    height: indv_hgt + '%',
                                    top: top + '%',
                                    offset: 0,
                                    min:minVal,
                                    tickInterval:interval,
                                    lineWidth: 2,
                                    plotOptions: {
                                        series: {
                                            compare: 'percent'
                                        }
                                    },
                                    plotLines:plotLines
                                });

                                switch (val.options[i].type) {
                                    case 'flags':
                                        innerSeries.push({
                                                name: 'USD to EUR',
                                                data: seriesData[i],
                                                id: 'dataseries'

                                            }, {
                                                type: series,
                                                name: 'Flags on series',
                                                data: [
                                                    {
                                                        x: Date.UTC(2014, 1, 22),
                                                        title: 'On series'
                                                    },
                                                    {
                                                        x: Date.UTC(2014, 3, 28),
                                                        title: 'On series'
                                                    }
                                                ],
                                                onSeries: 'dataseries',
                                                shape: 'squarepin'
                                            }, {
                                                type: series,
                                                name: 'Flags on axis',
                                                data: [
                                                    {
                                                        x: Date.UTC(2014, 2, 1),
                                                        title: 'On axis'
                                                    },
                                                    {
                                                        x: Date.UTC(2014, 3, 1),
                                                        title: 'On axis'
                                                    }
                                                ],
                                                shape: 'squarepin'
                                            }
                                        );
                                        selectedVal = 1;
                                        break;
                                    case 'multiple':
                                        var k = 0;
                                        $.each(dataValues, function (x, data) {
                                            innerSeries[k++] = {
                                                name: x,
                                                data: data
                                            };
                                            console.log('data ',dataValues);
                                        });
                                        interval = 5;
                                        minVal = 10;
                                        forMat = function () {
                                            return (this.value > 0 ? ' + ' : '') + this.value + '%';}
                                        plotLines: [{
                                            value: 0,
                                            width: 2,
                                            color: 'silver'
                                        }]

                                        break;
                                    default:
                                        innerSeries.push({
                                            type: series,
                                            name: title,
                                            data: seriesData[i],
                                            id: 'dataseries',
                                            yAxis: y,
                                            dataGrouping: {
                                                units: groupingUnits
                                            }
                                        });

                                }
                                y += 1;
                                top = top + indv_hgt;
                            }
                            angular.element(chartId).highcharts('StockChart', {
                                chart: {
                                    zoomType: 'x'
                                },
                                rangeSelector: {
                                    inputEnabled: $(chartId).width() > 480,
                                    selected: 1
                                },
                                title: {
                                    text: val.options[0].title
                                },
                                yAxis: yAxisArray,
                                series: innerSeries
                            });
                            console.log('innerSeries', innerSeries);
							}
					};

				});
