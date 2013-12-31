/*
    Description : I have followed the Model-Widget paradigm. This module is the Widget-part. Each time the carouselFramework creates a new
	              carousel on the page, a new instance of this module is created. For each view it follows a composite-kind of pattern, and
				  delegates the responsibility to initialize the view and handle user-interactions to each sub-views. It is also responsible
				  for interacting with the CarouselModel. 
*/

define([
	"jquery",
	"tmpl",
	"CarouselModel",
    "CarouselNavView",
    "CarouselButtonView",
    "CarouselCardView"
], function($, tmpl, CarouselModel, CarouselNavView, CarouselButtonView, CarouselCardView){ 
	var Carousel,
        noOfCarouselCardsOnOnePage = 6,
        startingCarouselItemIndex = 0;

	Carousel = function (initData) {
        this._init(initData);
    }

    Carousel.prototype._init = function(initData){
        var carouselState;
        //TODO: validation could be done here. 
        this.containerDomId = initData["containerDomId"];
        this.name = initData["name"];
        this.prefix = initData["prefix"];
        this.heading = initData["heading"];
        this.model = new CarouselModel({
            "paginationStrategyType" : initData["paginationStrategyType"],
            "carouselItemsIdList" : initData["carouselItemsIdList"],
            "noOfCarouselCardsOnOnePage" : noOfCarouselCardsOnOnePage,
            "startingCarouselItemIndex" : startingCarouselItemIndex,
            "carouselHandler" : this
        });
        
        this._setUpView();
        carouselState = this.model.getCarouselState();
        this._setUpSubViews(carouselState);
    }
    Carousel.prototype._setUpView = function(){
        var templateData = {},
            carouselHtml;

        templateData["id"] = this.name;
        templateData["heading"] = this.heading;

        //TODO: test here that containerDom node exists on the page. 
        this.$containerDomNode = $("#" + this.containerDomId);
        //TODO: cache the template in the outer function closure
        carouselHtml = tmpl($("#carousel-tmpl").html(), templateData);
        this.$containerDomNode.html(carouselHtml);
    }
    Carousel.prototype._setUpSubViews = function(carouselState){
        var subViewsInitData = {},
            i, 
            eventHandlers = {},
            self = this;

        eventHandlers["carouselButtonClick"] = function(buttonType){
            self.handleCarouselButtonClick(buttonType);
        }
        eventHandlers["carouselStartOverClick"] = function(){
            self.handleCarouselStartOverClick();
        }

        subViewsInitData["prefix"] = this.prefix;
        subViewsInitData["containerDomId"] = this.containerDomId;
        subViewsInitData["carouselState"] = carouselState;
        subViewsInitData["eventHandlers"] = eventHandlers;

        this._subViewHandlers = {};
        this._subViewHandlers["navView"] = new CarouselNavView(subViewsInitData);
        this._subViewHandlers["backButtonView"] = new CarouselButtonView(subViewsInitData, "back");
        this._subViewHandlers["nextButtonView"] = new CarouselButtonView(subViewsInitData, "next");
       
        for(i=0; i<noOfCarouselCardsOnOnePage; i++){
            this._subViewHandlers["carouselCardViews_" + i] = new CarouselCardView(subViewsInitData, i);
        }
    }
    
    Carousel.prototype.updateCarousel = function(carouselState, subViewsToUpdate){ 
        var subViewId, 
            i;
        if(!subViewsToUpdate){
            subViewsToUpdate = this.getAllSubViewsIds();
        }

        for(i in subViewsToUpdate){
            subViewId = subViewsToUpdate[i];
            if(this._subViewHandlers[subViewId]){
                this._subViewHandlers[subViewId].renderView(carouselState);
            }
        }
    }
    Carousel.prototype.getAllSubViewsIds = function(){
        var subViewsIds = [], 
            subViewId;
        for(subViewId in this._subViewHandlers){
            subViewsIds.push(subViewId);
        }
        return subViewsIds;
    }
    Carousel.prototype.handleCarouselButtonClick = function(buttonType){
        var carouselState;
        buttonType === "next" ? this.model.goToNextPage() : this.model.goToPreviousPage();
        carouselState = this.model.getCarouselState();
        this.updateCarousel(carouselState);
    }
    Carousel.prototype.handleCarouselStartOverClick = function(){
        var carouselState;
        this.model.goToFirstPage();
        carouselState = this.model.getCarouselState();
        this.updateCarousel(carouselState);
    }
    return Carousel;
});