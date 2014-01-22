/**
 * Author: Derek Gould
 * Date: 8/26/13
 * Time: 5:22 PM
 */

angular.module('vr.directives.areaspline',['d3'])
	.directive('areaspline', ['$timeout', function($timeout) {
	return {
		restrict: 'EA',
		replace: true,
		scope   : {
			data: '='
		},
		template: '<svg class="areaspline"><g d3 d3-data="histData" d3-renderer="render"><path></path></g></svg>',
		link: function(scope,elem,attr) {

			// set up coordinate system
			scope.area = d3.svg.area()
				.interpolate('basis')
				.x(function(d) { return scope.x(d[0]); })
				.y0(function() { return scope.height; })
				.y1(function(d) { return scope.y(d[1]); });
			
			// get the width and height of the 
			scope.width = angular.isUndefined(attr.width) ? 'auto' : attr.width;
			scope.height = angular.isUndefined(attr.height) ? 'auto' : attr.height;
			
			// are we scaling anything automatically?
			var scaleWidth = scope.width == 'auto';
			var scaleHeight = scope.height == 'auto';
			
			// get the svg for d3
			var svgContainer = d3.select(elem[0]);
			
			// get the parent element for auto sizing
			var parent = $(elem).parent();
			if(scaleWidth) {
				scope.width = parent.width();
			}
			if(scaleHeight) {
				scope.height = parent.height();
			}
			
			// scale the width and/or height
			function scale() {
				$timeout(function() {
					svgContainer.select('g').attr('transform', 
						"scale("+
							(scaleWidth ? (parent.width()/scope.width) : '1')+
						","+
							(scaleHeight ? (parent.height()/scope.height) : '1')+
						")"
					);
				});
			}
			
			// if either property should be scaled automatically
			if(scaleWidth || scaleHeight) {
				// watch window resize
				$(window).resize(scale);
				
				// listen for a manual resize event
				scope.$on('resizeAreaSpline', scale);
			}
			
			// set up angular-d3 renderer
			scope.render = function(el, data) {
				
				if(scaleWidth || scaleHeight) {
					// set the initial scale
					scale();
				}

				// set the axis scales
				scope.x = d3.scale.linear()
							.range([0,scope.width]);
				scope.y = d3.scale.linear()
							.range([scope.height,0]);

				// notch each axis
				scope.x.domain([0,data.length-1]);
				scope.y.domain(d3.extent(data, function(d) { return d[1]; }));
				
				// get the path
				var path = svgContainer.select('path');
				if(attr.transition){
					// perform an animated transition while changing the data set
					path.transition().attr('d', scope.area(data));
				}
				else{
					// set the data for the path
					path.attr('d', scope.area(data));
				}
			};

			// watch for data changes
			scope.$watch('data',function(newVal) {
				if(!newVal) {
					return;
				}
				scope.histData = newVal.map(function(v,i) { return [i,v]; });
			},true);
		}
	};
}]);
