module.exports = function(importedModuleName){
        const componentMapping = {"@service/components/addProduct/Form":"sales/service-components-addProduct-Form","@service/components/productDetails/Price":"sales/service-components-productDetails-Price","@service/components/productList/Price":"sales/service-components-productDetails-Price"}
    
        const file = componentMapping[importedModuleName]

    if(!file)
    return null
    return file
}