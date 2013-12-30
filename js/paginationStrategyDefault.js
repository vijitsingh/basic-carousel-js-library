define([
    "jQuery"
], function($){
	var paginationStrategy = {};
    function getNextPageInfo(noOfCarouselItems, noOfCarouselCardsOnOnePage, startingCarouselItemIndex){
        var newStartingCarouselItemIndex,
            endingCarouselItemIndex = startingCarouselItemIndex + noOfCarouselCardsOnOnePage - 1;
        newStartingCarouselItemIndex = (endingCarouselItemIndex + 1 >= noOfCarouselItems) ? 0 : (endingCarouselItemIndex + 1);
        return {
            "noOfPages" : getNoOfPages(noOfCarouselItems, noOfCarouselCardsOnOnePage),
            "currentPageNo" : getCurrentPageNo(noOfCarouselCardsOnOnePage, newStartingCarouselItemIndex),
            "itemsToShowIndexList" : getItemsToShowIndexList(noOfCarouselItems, noOfCarouselCardsOnOnePage, newStartingCarouselItemIndex)
        };
    }
    function getPreviousPageInfo(noOfCarouselItems, noOfCarouselCardsOnOnePage, startingCarouselItemIndex){
        var newStartingCarouselItemIndex,
            lastPageStartingCarouselItemIndex = ((getNoOfPages(noOfCarouselItems, noOfCarouselCardsOnOnePage)-1) * noOfCarouselCardsOnOnePage);

        // if on the first page, move to last page. 
        newStartingCarouselItemIndex = (startingCarouselItemIndex-noOfCarouselCardsOnOnePage>=0)?(startingCarouselItemIndex-noOfCarouselCardsOnOnePage) : lastPageStartingCarouselItemIndex;
        return {
            "noOfPages" : getNoOfPages(noOfCarouselItems, noOfCarouselCardsOnOnePage),
            "currentPageNo" : getCurrentPageNo(noOfCarouselCardsOnOnePage, newStartingCarouselItemIndex),
            "itemsToShowIndexList" : getItemsToShowIndexList(noOfCarouselItems, noOfCarouselCardsOnOnePage, newStartingCarouselItemIndex)
        };
    }
    function getCurrentPageInfo(noOfCarouselItems, noOfCarouselCardsOnOnePage, startingCarouselItemIndex){
        return {
            "noOfPages" : getNoOfPages(noOfCarouselItems, noOfCarouselCardsOnOnePage),
            "currentPageNo" : getCurrentPageNo(noOfCarouselCardsOnOnePage, startingCarouselItemIndex),
            "itemsToShowIndexList" : getItemsToShowIndexList(noOfCarouselItems, noOfCarouselCardsOnOnePage, startingCarouselItemIndex)
        };
    }
    function getNoOfPages(noOfCarouselItems, noOfCarouselCardsOnOnePage){
        return Math.ceil(noOfCarouselItems/noOfCarouselCardsOnOnePage);
    }
    function getCurrentPageNo(noOfCarouselCardsOnOnePage, startingCarouselItemIndex){
        return Math.ceil((startingCarouselItemIndex + 1) /noOfCarouselCardsOnOnePage); //as 0-indexed. 
    }
    function getItemsToShowIndexList(noOfCarouselItems, noOfCarouselCardsOnOnePage, startingCarouselItemIndex){
        var itemsIndexList = [],
            i, 
            itemIndex = startingCarouselItemIndex;
        for(i=0; i<noOfCarouselCardsOnOnePage; i++){
            itemsIndexList.push(itemIndex >= noOfCarouselItems ? -1 : itemIndex);
            itemIndex++;
        }

        return itemsIndexList;
    }

    paginationStrategy.getNextPageInfo = getNextPageInfo;
    paginationStrategy.getPreviousPageInfo = getPreviousPageInfo;
    paginationStrategy.getCurrentPageInfo = getCurrentPageInfo;
    return paginationStrategy;
});