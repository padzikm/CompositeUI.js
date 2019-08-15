let products = [
    {
        id: undefined,
        quantity: 30
    },
    {
        id: undefined,
        quantity: 20
    },
    {
        id: undefined,
        quantity: 10
    }
];

module.exports.setupFakeData = function(ids){
    for(let i = 0; i < products.length; ++i)
        products[i].id = ids[i];
}

module.exports.getProductDetails = function(req, result){
    for(let product of products)
        if(product.id === req.params.id){
            result.catalog = product;
            break;
        }
    console.log('from catalog:')
    console.log(result.catalog)
}

module.exports.getProductList = function(req, result){
    result.ids = [];
    for(let product of products)
        result.ids.push(product.id)
    result.catalog = {
        ids: result.ids,
        quantityById: products
    }
    console.log('from catalog:')
    console.log(result.catalog)
    result.emit('getProductList');
}

module.exports.onCreateProductId = function(result){}

module.exports.createProduct = function(req, result){
    let id = req.body.catalog.productId;
    let quantity = req.body.catalog.quantity
    let product = {
        id, quantity
    };
    products.push(product)
    result.catalog = {
        productId: id,
        quantity
    }
    console.log('from catalog:')
    console.log(result.catalog)
}