mainApp.directive("translate",function(translateService,$timeout) {
    var linker = function(scope, iElement, iAttrs)
    {
     	scope.textValue = iAttrs.textValue;
     	scope.item = iAttrs.textValue;
   		scope.$watch("language",function(val) {
   			scope.readJson(val);
   		});
    }

    var translateCtrl = function($scope,$http){
        $scope.readJson = function(file){
    			$http.get("language/translate_"+file+".json").then(function(pRes) {
    				$scope.item = translateService.translateText($scope.textValue,pRes.data);
    			});
    		}
    }
    return {
        restrict: 'EA',
        scope: {
          textValue:'@',
          language:"="
        },
        link : linker,
        controller : translateCtrl,
        template: '<span>{{item}}</span>'
    }
});
