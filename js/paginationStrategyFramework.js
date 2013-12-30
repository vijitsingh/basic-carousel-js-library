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