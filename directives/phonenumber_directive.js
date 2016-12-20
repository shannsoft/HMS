mainApp.directive('phonenumberDirective', ['$filter', function($filter) {
		function link(scope, element, attributes) {
			scope.inputValue = scope.phonenumberModel;
			scope.$watch('inputValue', function(value, oldValue) {
				value = String(value);
				var number = value.replace(/[^0-9]+/g, '');
				scope.phonenumberModel = number;
				scope.inputValue = $filter('phonenumber')(number);
			});
			scope.$watch('phonenumberModel', function(value, oldValue) {
        value = String(value);
				var number = value.replace(/[^0-9]+/g, '');
				scope.phonenumberModel = number;
				scope.inputValue = $filter('phonenumber')(number);
			});
		}
		return {
			link: link,
			restrict: 'E',
			scope: {
				phonenumberPlaceholder: '=placeholder',
				phonenumberModel: '=model',
				class: '=customclass',
			},
			template: '<input ng-model="inputValue" type="tel" class="{{class}}" placeholder="{{phonenumberPlaceholder}}" title="Phonenumber (Format: (999) 9999-9999) && (Format:+91-9999999999)">',
		};
	}])
  mainApp.filter('phonenumber', function() {
	    return function (number) {
        if (!number) { return ''; }
        number = String(number);
        var formattedNumber = number;
  			var c = (number[0] == '1') ? '1 ' : '';
  			number = number[0] == '1' ? number.slice(1) : number;
  			// # (###) ###-#### as c (area) front-end
  			var area = number.substring(0,2);
  			var front = number.substring(2, 4);
  			var end = number.substring(4, 12);
  			if (front) {
  				formattedNumber = (c + "(" + area + ") " + front);
  			}
  			if (end) {
  				formattedNumber += ("-" + end);
  			}
  			return formattedNumber;
  	  };
	});
