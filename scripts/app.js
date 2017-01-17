/**
 * Created by DAY on 07-08-2014.
 */
var myApp = angular.module('myApp',['ngGrid','appService','adapterService']);
myApp.controller('mainController',['$scope','$http','$timeout','movieService','asyncService','$rootScope','chartService', function($scope, $http, $timeout,movieService,asyncService,$rootScope,chartService){
    $scope.dataInfo = [];
    var table1_data = [];
    var jsonUrl ;
    $scope.chartIdx = 0 ;
    $http({method: 'GET', url: '../json/meta.json'}).success(function(data, status) {
        $scope.data = data;
        $scope.sideBarTitle = data.PreTrade;
        $scope.dataInfo = $scope.sideBarTitle;
        $scope.myTemplate = $scope.dataInfo[0].templateUrl;
        $scope.partialData = $scope.dataInfo[0].PartialLayout;
        $scope.mytable = data.tableUrl;
        $scope.mytable1 = data.tableUrl1;
        $scope.myCharts = data.chartsUrl;
        }).
        error(function(data, status){
        });
       $scope.selectedIndex = 0;
       $scope.showTemplate= function($index){
        $timeout(function() {
          //  $scope.$apply(function() {
                $scope.myTemplate = $scope.dataInfo[$index].templateUrl;
                $scope.partialData = $scope.dataInfo[$index].PartialLayout;
                //  jsonUrl = $scope.dataInfo[$index].jsondata;
                $scope.selectedIndex = $index;
       //     });
      //   jsonurlCall(jsonUrl);
        },600);
    };



    $scope.callUrl = function (ind, val,jsonUrl,indGrid) {
     var url = '../json/'+jsonUrl;
     var promise = asyncService.loadDataFromUrls(url);
     //  var promise = movieService.getMovie(url);
        if (!$scope.tableData) {
            $scope.tableData = {};
            $scope.dashboard = {};
        }
        if(!$scope.chartConfig){
            $scope.chartConfig ={};
        }

        angular.element('.gridStyle').bind('click','.ngCell',function(){
            alert('cell');
        });
        $scope.tableData[jsonUrl] = {data: 'dashboard["' + jsonUrl + '"]',
                                      enableColumnResize: true,
                                      enableColumnReordering: true,
                                      enablePinning: val.options[0].Pinning,
                                      enableCellEdit: val.options[0].CellEdit,
                                      enableRowReordering: val.options[0].RowReordering/*,
                                      columnDefs: [{
                                                        cellTemplate: '<div ng-click="foo()">{{row.getProperty(col.field)}}</div>'
                                                    }]*/
                                      };
        promise.then(
            function(res) {
                if (val.type == 'Table') {
                   $scope.dashboard[jsonUrl] = res[0].data.tables[0].Dashboard;
                }
                else {
                    $timeout(function(){
                        chartService.graphConfigures(res,val,jsonUrl,$scope,indGrid);
                    },1000);
                }
           });
    };



   $scope.iconUp = true;
    $scope.closeDiv = function(e){
        console.log('target',e.target);
        angular.element(e.target).parent().parent().parent().parent().parent().addClass('closeDiv');
    }

    $scope.collapseDiv = function(e,i){
        console.log('i',i);
        $scope.iconUp = !$scope.iconUp;
        $scope.iconDown = !$scope.iconDown;
        $scope.isCollapsed[i] = !$scope.isCollapsed[i];
    }

}]);

myApp.directive('expand', function() {
    return {
        restrict: 'AE',
        template: '<i class="fa fa-chevron-up"></i>',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                elem.find('i').toggleClass('fa-chevron-down');
               elem.parents('.widget').find('.gridStyle').slideToggle(300);
            });
        }
    };
});
myApp.directive('overlay', function() {
    return {
        restrict: 'AE',
        template: '<i class="fa fa-eye"></i>',
        link: function(scope, elem, attrs) {
            var i = 0;
            elem.bind('click', function(e) {
                i++;
                elem.find('i.fa-eye').toggleClass('fa-eye-slash');
                if( i%2 == 0){
                    $theWidget = elem.parents('.widget');
                    elem.parents('body').find('.focus-overlay').fadeOut(function(){
                       angular.element('.focus-overlay').remove();
                        elem.parents('.widget').removeClass('widget-focus-enabled');
                    });
                }
                else{
                    angular.element(e.target).parents('.widget').addClass('widget-focus-enabled');
                    angular.element('<div class="focus-overlay"></div>').hide().appendTo('body').fadeIn(300);
                }
            });

        }
    };
});

