module.exports = function(importedModuleName){
        const componentMapping = {"@service/components/addProduct/Description":"marketing/service-components-addProduct-Description","@service/components/productDetails/Description":"marketing/service-components-productDetails-Description","@service/components/productList/Description":"marketing/service-components-productList-Description"}
    
        const file = componentMapping[importedModuleName]

    if(!file)
    return null
    return file
}