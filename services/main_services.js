mainApp.factory('translateService',function(){
    return {
        translateText: function(pText,translateJSON){
            var translatedText ="No Label";
            try {
                var jsonkeyName = pText.trim();
                jsonkeyName = jsonkeyName.replace(/\s+/g, ' ');
                jsonkeyName = jsonkeyName.replace(/[^a-zA-Z\s]/g,"").replace(/[\s]/g,"_");
                jsonkeyName = jsonkeyName.toUpperCase();
                jsonkeyName = jsonkeyName.replace(/__/g,'_');
                translatedText =  translateJSON[jsonkeyName];
                if(typeof translatedText == "undefined")
                    translatedText ="No Label";
         	}
         	catch(err) {
               translatedText ="No Label";
          	}
        	return translatedText;
        }
    }
});
mainApp.factory('RegisterService',function($http,CONFIG,$localStorage){
    return {
      register: function(data,operation){
        var _serializedData = $.param({"reqmethod": 'register', 'operation':operation,'register_data':data});
        var response = $http({
            method: 'POST',
            url: CONFIG.HTTP_HOST,
            data : _serializedData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded','Accesstoken':$localStorage.user.token
            }
        });
        return response;
      },
    }
});
