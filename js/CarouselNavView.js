/*
    Description : A sub-view which controls the nav-bar of the carousel.
*/

define([
	"jquery"
], function($){
	var CarouselNavView;

	CarouselNavView = function(initData){
		this._init(initData);
	}

	CarouselNavView.prototype._init = function(initData) {
		var carouselState = initData["carouselState"];
		this.prefix = initData["prefix"];
		this.containerDomId = initData["containerDomId"];
		this.showPageNo = true; //default value
		this.showStartOverLink = true;
		this.$startOverDomElement = $("#" + this.containerDomId).find(".start-over-link");
		this.$pageNoDomElement = $("#" + this.containerDomId).find(".page-no");
		this._attachEventHandlers(initData["eventHandlers"]);

		this.renderView(carouselState);
	};

	CarouselNavView.prototype._attachEventHandlers = function(eventHandlers) {
		var carouselButtonClickHandler = eventHandlers["carouselStartOverClick"],
		    self = this;

		this.$startOverDomElement.click(carouselButtonClickHandler);
	};
	CarouselNavView.prototype.renderView = function(carouselState) {
		var currentPageNo = carouselState["currentPageNo"],
			noOfPages = carouselState["noOfPages"];

		if(currentPageNo !== -1 && noOfPages !== -1){
			this.$pageNoDomElement.show();
			this.$pageNoDomElement.html("Page " + currentPageNo + " of " + noOfPages);
		} else {
			this.$pageNoDomElement.hide();
		}

		if(currentPageNo === 1){
			this.$startOverDomElement.hide();
		} else {
			this.$startOverDomElement.show();
		}
	};

	return CarouselNavView;
});