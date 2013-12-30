require.config({
	baseUrl : "../js/",
    paths : {
        "jQuery" : "../library/jQuery",
        "templateEngine" : "../library/templateEngine"
    }
});

require([
    'jQuery',
    'templateEngine',
    'Carousel'
    ], function(jQuery, templateEngine, Carousel){
        var carouselInstance, 
            initData = {},
            initData2 = {},
            $dummyNode;
 
	    initData["name"] = "sample-carousel";
	    initData["prefix"] = "sam-car";
	    initData["heading"] = "Sample Carousel 1";
	    initData["containerDomId"] = "sample-container";
        initData["carouselItemsIdList"] = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11","A12", "A13", "A14", "A15", "A16"];

	    //create the domId on the 
	    $("body").append("<div id='sample-container'> </div>");
	    new Carousel(initData);

        //create another carousel 
        initData2["name"] = "sample-carousel2";
        initData2["prefix"] = "sam-car2";
        initData2["heading"] = "Sample Carousel 2";
        initData2["containerDomId"] = "sample-container2";
        initData2["carouselItemsIdList"] = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11","A12", "A13", "A14", "A15", "A16"];

        //create the domId on the 
        $("body").append("<div id='sample-container2'> </div>");
        new Carousel(initData2);
});