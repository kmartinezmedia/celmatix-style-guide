angular.module('styleGuide', ['ngLodash'])
.config(function($httpProvider){
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('AppCtrl', function ($scope, lodash, $http) {
	$scope.selectedHeadingStyle = ["", "", "black"];

	$scope.addHeadingClass = function(index,style){
		if ($scope.selectedHeadingStyle[index] == style){
			$scope.selectedHeadingStyle[index] = "";
		} else {
			$scope.selectedHeadingStyle[index] = style;
		}
		console.log($scope.selectedHeadingStyle);
	};

	$scope.headings = [
	{tag: "h1", size: "5.0rem"},
	{tag: "h2",size: "4.2rem"},
	{tag: "h3",size: "3.6rem"},
	{tag: "h4",size: "3.0rem"},
	{tag: "h5",size: "2.4rem"},
	{tag: "h6",size: "1.5rem"}
	];

	$scope.selectedFont = "sans-serif";
	$scope.headingPlaceholder = "Heading";
	$scope.selectedTab = 0;
	$scope.heading_styles = 
	[
		{class: "sans-serif",label: "Avenir Sans-Serif"},
		{class: "serif",label: "PT Serif"}
	];

	// $http.get('https://api.forecast.io/forecast/9ee35b19ae97722c7721564e8baf238c/40.754,-73.985').then(function(resp){
	// 	console.log(resp)
	// }, function(err){
	// 	console.log(err);
	// })

})

.controller('PatientProfileCtrl', function($scope){
	$scope.sections = [
		{index: 0, heading: "Patient Info", image: "./img/info.png", label: 'Kate & John have been trying to conceive for the past 12 months. They were referred by Dr. Reina.', button: "View"},
		{index: 1, heading: "Patient Intake",image: "./img/intake.png", label: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.", button: "View"},
		{index: 2, heading: "Appointment", image: "./img/appointment.png", label: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.", button: "View"},
		{index: 3, heading: "Patient Packet", image: "./img/packet.png", label: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.", button: "View"},
		{index: 4, heading: "Initial Consultation", image: "./img/consult.png", label: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.", button: "View"},
		{index: 5, heading: "Polaris Report", image: "./img/polaris.png", label: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.", button: "View"}
	];
	$scope.zoomcard = function(id){
		console.log(id);
	 	var card = document.getElementById(id);
		// move(card)
		// .translate(300, 80)
  // 		.end();
	}
})

.directive('card', function () {
	return {
		restrict: 'E',
		scope:{
			section: '=',
			zoomcard: '&',
			index: '='
		},
		templateUrl: "./views/card.html",
		controller: function($scope, $element, $attrs){
			//console.log($element);
		},
		link: function (scope, elem, attrs) {
			elem.bind('click', function() {
				console.log(elem.parent());
				console.log(scope);
				console.log(elem.parent()[0].offsetWidth);
				var parentWidth  = (elem.parent()[0].offsetWidth) - 60;
				console.log(elem[0].id);
				var id = elem[0].id;
				var card = document.getElementById(id);
				move('#heading_'+ scope.index)
				.set('text-align', 'left')
				.set('padding-left', '70px')
				.end();
				move('#image_' + scope.index)
				.set('display', 'inline-block')
				.set('position', 'absolute')
				.set('top', '25px')
				.set('width', '60px')
				.end();
				move('#button_' + scope.index)
				.set('position', 'absolute')
				.set('top', '30px')
				.set('right', '80px')
				.end();
				move(card)
				.set('width', parentWidth + 'px')
		  		.end();
		  		// var buttonId = '#button_' + scope.index;
		  		// var button = document.getElementById(id);
		  		// console.log()
		  		// button.innerHtml('Close');
      		});
		}
	};
})

.filter('makeRange', function() {
  return function(input) {
    var lowBound, highBound;
    switch (input.length) {
    case 1:
      lowBound = 0;
      highBound = parseInt(input[0]) - 1;
      break;
    case 2:
      lowBound = parseInt(input[0]);
      highBound = parseInt(input[1]);
      break;
    default:
      return input;
    }
    var result = [];
    for (var i = lowBound; i <= highBound; i++){
    	result.push(i);
    	return result;
    }
  };
})

.directive('createHeading', function ($compile) {
	return {
		restrict: 'E',
		scope: {
			tag: "=",
			placeholder: "@"
		},
		replace: true,
		link: function (scope, elem) {
			var tag = document.createElement(scope.tag);
			tag.innerHTML = "{{placeholder}}";
            var linkFn = $compile(tag);
            var content = linkFn(scope);
            elem.append(content);
            // console.log(elem);
            // element.on("click", function() {
            //     scope.$apply(function() {
            //         var content = $compile(tag)(scope);
            //         element.append(content);
            //    })
            // });

		}
	};
});