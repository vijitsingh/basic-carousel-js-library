define([
	"jquery",
	"paginationStrategyFramework",
	"ajaxProxy"
], function($, paginationStrategyFramework, ajaxProxy){
	var CarouselModel,
        defaultStartingCarouselItemIndex = 0,
        STRING_CAROUSEL_CARD_VIEWS_PREFIX = "carouselCardViews_";

	CarouselModel = function(initData){
        this._init(initData);
    }

    CarouselModel.prototype._init = function(initData){
        var currentPageInfo, 
            startingCarouselItemIndex;
        this.paginationStrategyType = initData["paginationStrategyType"];
        this.carouselItemsIdList = initData["carouselItemsIdList"];
        this.noOfCarouselCardsOnOnePage = initData["noOfCarouselCardsOnOnePage"];
        startingCarouselItemIndex = initData["startingCarouselItemIndex"] || defaultStartingCarouselItemIndex;
        this.carouselHandler = initData["carouselHandler"];

        this.paginationStrategy = paginationStrategyFramework.getStrategy(this.paginationStrategyType);
        this.carouselItemsHTML = {};
        this.noOfCarouselItems = this.carouselItemsIdList.length;

        currentPageInfo = this.paginationStrategy.getCurrentPageInfo(this.noOfCarouselItems, this.noOfCarouselCardsOnOnePage, startingCarouselItemIndex);
        this.carouselState = this._populateCarouselState(currentPageInfo);
    }
    CarouselModel.prototype._populateCarouselState = function(currentPageInfo){
        var carouselState = {},
            carouselCardsContent = this._populateCarouselCardsContent(currentPageInfo);

        carouselState["noOfCarouselCardsOnOnePage"] = this.noOfCarouselCardsOnOnePage;
        carouselState["noOfPages"] = currentPageInfo["noOfPages"];
        carouselState["currentPageNo"] = currentPageInfo["currentPageNo"];
        carouselState["itemsToShowIndexList"] = currentPageInfo["itemsToShowIndexList"];
        carouselState["carouselCardsContent"] = carouselCardsContent;

        return carouselState; 
    }
    /*
        Algo : Iterate through the list of all items to be shown. 
                   Check if the HTML is present for that item. If yes, then set that html.
                   If the html is not present, then request the html for that item from ajaxProxy. Set the content-type to be loading-bar
                   If the itemIndex is -1, that means nothing should be shown and it is an empty card. 
    */
    CarouselModel.prototype._populateCarouselCardsContent = function(currentPageInfo){
        var carouselItemsIdList = "",
            contentType, 
            itemIndex,
            i,
            itemId,
            cardContent,
            carouselCardsContent = {},
            itemsToShowIndexList = currentPageInfo["itemsToShowIndexList"],
            // ajax-response comes back only with itemId, we need to know which card needs to be updated. 
            itemIdToCardNoMap = {},
            self = this;

        for(i=0; i<itemsToShowIndexList.length; i++){
            cardContent = {};
            itemIndex = itemsToShowIndexList[i];
            if(itemIndex === -1){
                cardContent["contentType"] = "empty";
            } else {
                itemId = this.carouselItemsIdList[itemIndex];
                itemIdToCardNoMap[itemId] = i;

                if(this.carouselItemsHTML[itemId] === undefined){
                    cardContent["contentType"] = "loadingBar";
                    carouselItemsIdList += (itemId + ","); // add in the list to be fetched using ajax
                } else {
                    cardContent["contentType"] = "html";
                    cardContent["html"] = this.carouselItemsHTML[itemId];
                }
            }   
            carouselCardsContent[i] = cardContent;
        }
        if(carouselItemsIdList){ //empty-string is a falsy value in JS
            this._fetchCarouselItemsHtml(carouselItemsIdList, itemIdToCardNoMap);
        } 
        return carouselCardsContent;
    }
    CarouselModel.prototype._fetchCarouselItemsHtml = function(carouselItemsIdList, itemIdToCardNoMap){
        var self = this;
        ajaxProxy.ajax({
                "url" : "dummy-url",
                "data": {
                    "asinList" : carouselItemsIdList
                },
                "success": function(responseData){
                    self._handleAjaxResponse(responseData, itemIdToCardNoMap);
                }
            });
    }
    CarouselModel.prototype._handleAjaxResponse = function(responseData, itemIdToCardNoMap){
        var subViewsToUpdate = [],
            itemId,
            cardNo,
            currentStartingCarouselItemIndex = this.carouselState["itemsToShowIndexList"][0],
            currentPageInfo;

        for(itemId in responseData){
            cardNo = itemIdToCardNoMap[itemId];
            subViewsToUpdate.push(STRING_CAROUSEL_CARD_VIEWS_PREFIX + cardNo);
            this.carouselItemsHTML[itemId] = responseData[itemId];
        }

        // now that the data is present. Let's recompute the CarouselState, only the cardViews Data would change.
        currentPageInfo = this.paginationStrategy.getCurrentPageInfo(this.noOfCarouselItems, this.noOfCarouselCardsOnOnePage, currentStartingCarouselItemIndex);
        this.carouselState = this._populateCarouselState(currentPageInfo);
        this.carouselHandler.updateCarousel(this.carouselState, subViewsToUpdate);
    }
    CarouselModel.prototype.getCarouselState = function(){
        return this.carouselState;
    }
    CarouselModel.prototype.goToNextPage = function() { 
        var currentPageInfo,
            currentStartingCarouselItemIndex = this.carouselState["itemsToShowIndexList"][0];

        currentPageInfo = this.paginationStrategy.getNextPageInfo(this.noOfCarouselItems, this.noOfCarouselCardsOnOnePage, currentStartingCarouselItemIndex);
        this.carouselState = this._populateCarouselState(currentPageInfo);
        this.carouselHandler.updateCarousel(this.carouselState);
    };
    CarouselModel.prototype.goToPreviousPage = function() {
        var currentPageInfo,
            currentStartingCarouselItemIndex = this.carouselState["itemsToShowIndexList"][0];

        currentPageInfo = this.paginationStrategy.getPreviousPageInfo(this.noOfCarouselItems, this.noOfCarouselCardsOnOnePage, currentStartingCarouselItemIndex);
        this.carouselState = this._populateCarouselState(currentPageInfo);
        this.carouselHandler.updateCarousel(this.carouselState);
    };
    CarouselModel.prototype.goToFirstPage = function() {
        var currentPageInfo,
            startingCarouselItemIndex = defaultStartingCarouselItemIndex;

        currentPageInfo = this.paginationStrategy.getCurrentPageInfo(this.noOfCarouselItems, this.noOfCarouselCardsOnOnePage, startingCarouselItemIndex);
        this.carouselState = this._populateCarouselState(currentPageInfo);
        this.carouselHandler.updateCarousel(this.carouselState);
    };
    return CarouselModel;
});