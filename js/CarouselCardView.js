/*
    Description : A sub-view which is created for each card shown on the Carousel. 
*/

define([
	"jquery"
], function($){
	var CarouselCardView,
		loadingBarHtml = '<div> <img width="160" height="177" border="0" alt="" src="http://g-ecx.images-amazon.com/images/G/01/javascripts/lib/popover/images/snake._V192571611_.gif"></div>';

	CarouselCardView = function(initData, cardIndex){
		this._init(initData, cardIndex);
	}

	CarouselCardView.prototype._init = function(initData, cardIndex) {
		var carouselState = initData["carouselState"];
		this.prefix = initData["prefix"];
		this.containerDomId = initData["containerDomId"];
		this.cardIndex = cardIndex;

		this.$domElement = $("#" + this.containerDomId).find(".shoveler-cell-" + this.cardIndex);
		this.renderView(carouselState);
	};

	CarouselCardView.prototype.renderView = function(carouselState) {
		var cardContent,
		    contentType,
		    cardHtml = "";

		if(!carouselState["carouselCardsContent"] || !carouselState["carouselCardsContent"][this.cardIndex]){ //return if no valid entry for its content
			return;
		}
		cardContent = carouselState["carouselCardsContent"][this.cardIndex];
		contentType = cardContent["contentType"];
		if(contentType === "loadingBar"){
			cardHtml = loadingBarHtml;
		} else if(contentType === "html"){
			cardHtml = cardContent["html"] || "";
		}
		
		this.$domElement.html(cardHtml);
	};

	return CarouselCardView;
});