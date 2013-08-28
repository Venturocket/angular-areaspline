/**
 * Author: Derek Gould
 * Date: 8/26/13
 * Time: 5:22 PM
 */

angular.module('vr.directives.areaspline',['d3'])
	.directive('areaspline', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope   : {
			data: '='
		},
		template: '<svg class="areaspline"><g d3 d3-data="histData" d3-renderer="render"><path></path></g></svg>',
		link: function(scope,elem,attr) {

			scope.area = d3.svg.area()
				.interpolate('basis')
				.x(function(d) { return scope.x(d[0]); })
				.y0(function() { return scope.height; })
				.y1(function(d) { return scope.y(d[1]); });

			scope.render = function(el, data) {

				scope.width = angular.isUndefined(attr.width) ? 100 : attr.width;
				scope.height = angular.isUndefined(attr.height) ? 100 : attr.height;

				scope.x = d3.scale.linear()
							.range([0,scope.width]);
				scope.y = d3.scale.linear()
							.range([scope.height,0]);

				scope.x.domain([0,data.length-1]);
				scope.y.domain(d3.extent(data, function(d) { return d[1]; }));

                var svgContainer = d3.select(elem[0]);
                svgContainer.style('height', scope.height).style('width', scope.width);
                var path = svgContainer.select('path');
                if(attr.transition){
                    // perform an animated transition while changing the data set
                    path.transition().attr('d', scope.area(data));
                }
                else{
                    path.attr('d', scope.area(data));
                }
			};

			scope.$watch('data',function(newVal) {
				if(!newVal) {
					return;
				}
				scope.histData = newVal.map(function(v,i) { return [i,v]; });
			},true);

		}
	};
});
