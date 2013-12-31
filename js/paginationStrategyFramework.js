/*
    Description : This is the paginationStrategy framework which supports getting an instance of a paginationStrategy. It also supports adding of
	              new custom strategies. 
				  By default this creates an instance of a default strategy which is nothing but shows the next set of cards available. NOTE that it
				  is very easy to add a new strategy. Other variations could be as follows : 
				  a) where each click on left/right button result only in one shift of card
				  b) The cards are in a circular queue, there is nothing like the last/first page in that case. 
				  
				  It should be fairly straightforward to support such strategies with this freamework. 
*/

define([
	"jquery",
	"paginationStrategyDefault"
], function($, paginationStrategyDefault){
	var paginationStrategyFramework = {},
	        // map of strategyType to the strategyObject. 
            strategyHandlersMap = {},
            STRING_DEFAULT_PAGINATION = "defaultPagination"; 

    function getStrategy(strategyType) {
        if(strategyHandlersMap[strategyType] === undefined){
        	strategyType = STRING_DEFAULT_PAGINATION;
        }
        return strategyHandlersMap[strategyType];
    }

    function addStrategy(strategyType, strategyHandler){
        strategyHandlersMap[strategyType] = strategyHandler;
    }

    //add the default pagination strategy
    addStrategy(STRING_DEFAULT_PAGINATION, paginationStrategyDefault);

    paginationStrategyFramework.addStrategy = addStrategy;
    paginationStrategyFramework.getStrategy = getStrategy;

	return paginationStrategyFramework;
});