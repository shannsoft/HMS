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
