/**
 * User: Joe Linn
 * Date: 8/28/13
 * Time: 12:51 PM
 */

angular.module('ExampleApp', ['vr.directives.areaspline'])
    .controller('MainCtrl', ['$scope', '$document', function($scope, $document) {
        $scope.data = [0,0,1,3,1,0,0];
        $scope.randomize = function() {
            var randLength = Math.ceil(Math.random()*9)+1;
            var newData = [];
            for(var i=0;i<randLength;i++) {
                newData[i] = Math.ceil(Math.random()*20);
            }
            $scope.data = newData;
        };
    }]);