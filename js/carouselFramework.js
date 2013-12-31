/*
    Description : This the interface for the library. Any client which wishes to show a carousel could depend on this module and call the 
	              createCarousel() method of this module to create a new instance. It performs a basic validation to make sure a new request 
				  does NOT ask to create a carousel with similar mandatory parameters as one which already exist on the page. 
*/

define([
    "jquery",
    "Carousel"
], function($, Carousel){ 
    //private variables

    var carouselFramework = {},
    // Map of name to carousel properties, like $domId, carousel-handler
    // if the same name is provided again error would be thrown and no carousel would be created.
    carouselHandlerMap = {},
    // safety to make sure same domId is not provided for 2 carousels.
    carouselContainerDomIdMap = {};
    carouselNameMap = {};
    carouselPrefixMap = {};


    function createCarousel(carouselInitData){
        var carouselName = carouselInitData["name"],
            carouselPrefix = carouselInitData["prefix"],
            carouselContainerDomId = carouselInitData["containerDomId"],
            carouselItemsIdList = carouselInitData["carouselItemsIdList"];

        if(!carouselName || !carouselPrefix || !carouselContainerDomId || !carouselItemsIdList){
            console.log("Mandatory input attributes for carousel Not present. Returning");
            return;
        }

        if(carouselContainerDomIdMap[carouselContainerDomId] || carouselNameMap[carouselName] || carouselPrefixMap[carouselPrefix]){
            console.log("Carousel with input attributes already present on page. Returning");
            return;
        }

        if($("#" + carouselContainerDomId).length <= 0){
            console.log("containerDomId is Not present on page. Returning");
            return;
        }

        //Parameters validated, we are good to create the carousel now. 
        try {
            carouselHandlerMap[carouselName] = new Carousel(carouselInitData);
        } catch(e){
            console.log("Carousel creation failed with error : " + e);
        }
        carouselNameMap[carouselName] = true;
        carouselPrefixMap[carouselPrefix] = true;
        carouselContainerDomIdMap[carouselContainerDomId] = true;
    }

    function destroyCarousel(){
        //NOT IMPLEMENTED
    }

    carouselFramework.createCarousel = createCarousel;
    carouselFramework.destroyCarousel = destroyCarousel;
    
    return carouselFramework;
});