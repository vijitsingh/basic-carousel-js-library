define([
	"jquery"
], function($){
	var randomCarouselCardHTML,
        ajaxProxy = {},
        CONSTANT_RESPONSE_DELAY = 3000;
        

        randomCarouselCardHTML = {
            "1" : '<div> <img width="160" height="177" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41OP1%2B0dS9L._SX160_.jpg"></div>',
            "2" : '<div> <img width="135" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41LQKbVyLUL._SY200_.jpg"> </div>',
            "3" : '<div> <img width="135" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41YINDnSIrL._SY200_.jpg"> </div>',
            "4" : '<div> <img width="135" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41YINDnSIrL._SY200_.jpg"> </div>',
            "5" : '<div> <img width="139" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41jJ7sjYBHL._SY200_.jpg"> </div>',
            "6" : '<div> <img width="154" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41BHqeewejL._SY200_.jpg"> </div>',
            "7" : '<div> <img width="154" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41BHqeewejL._SY200_.jpg"> </div>',
            "8" : '<div> <img width="154" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41ptzvRjZXL._SY200_.jpg"> </div>',
            "9" : '<div> <img width="154" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41ptzvRjZXL._SY200_.jpg"> </div>',
            "10" : '<div> <img width="154" height="200" border="0" alt="" src="http://ecx.images-amazon.com/images/I/41ptzvRjZXL._SY200_.jpg"> </div>'
        };

        function ajax(settings){
            var url = settings.url,
                data = settings.data,
                successCallback = settings.success,
                asinList,
                asinArr, 
                responseData = {},
                asinIter,
                randomNo;

            if(url === undefined || data === undefined || data.asinList === undefined){ 
                console.log("invalid params");
                return; 
            }

            asinList = data.asinList;
            asinArr = asinList.split(",");
            for(asinIter = 0; asinIter < asinArr.length; asinIter++){
                asin = asinArr[asinIter];
                randomNo = Math.floor((Math.random()*10)+1);
                responseData[asin] = randomCarouselCardHTML[randomNo];
            }

            setTimeout( function(){
                successCallback(responseData);
            }, CONSTANT_RESPONSE_DELAY);
        } 

        ajaxProxy.ajax = ajax;

        return ajaxProxy;
});