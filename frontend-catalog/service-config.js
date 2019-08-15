module.exports = function(importedModuleName){
        const componentMapping = {"@service/components/addProduct/StockQuantity":"catalog/service-components-addProduct-StockQuantity","@service/components/productDetails/Stock":"catalog/service-components-productDetails-Stock","@service/components/productList/Body":"catalog/service-components-productList-Body"}
    
        const file = componentMapping[importedModuleName]

    if(!file)
    return null
    return file
}