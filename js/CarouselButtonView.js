/*
    Description : A sub-view which takes care of functioning of the left and right button 
	for the carousel. It calls the handler of the parent-view when the button is clicked 
	and if the button is enabled. 
*/

define([
	"jquery"
], function($){
	var CarouselButtonView;

	CarouselButtonView = function(initData, buttonType){
		this._init(initData, buttonType);
	}

	CarouselButtonView.prototype._init = function(initData, buttonType){
		var carouselState = initData["carouselState"];
		this.prefix = initData["prefix"];
		this.containerDomId = initData["containerDomId"];
		this.buttonType = buttonType;
		this.buttonCssSelector = "#" + this.containerDomId + " ." + this.buttonType + "-button";
		this.isButtonEnabled = true; //default value
		this._attachEventHandlers(initData["eventHandlers"]);

		this.renderView(carouselState);
	}

	CarouselButtonView.prototype._attachEventHandlers = function(eventHandlers){
		var carouselButtonClickHandler = eventHandlers["carouselButtonClick"],
		    self = this;

		$(this.buttonCssSelector).click(function(){
			if(!self.isButtonEnabled) return; // should not be clickable if button is disabled. 
			carouselButtonClickHandler(self.buttonType);
		});
	}

	CarouselButtonView.prototype.renderView = function(carouselState){
		var currentPageNo = carouselState["currentPageNo"],
			noOfPages = carouselState["noOfPages"];

	    this.isButtonEnabled = true;
		if(currentPageNo === 1 && this.buttonType === "back"){
			this.isButtonEnabled = false;
		} else if(currentPageNo === noOfPages && this.buttonType === "next") {
			this.isButtonEnabled = false;
		}
	}

	return CarouselButtonView;
});