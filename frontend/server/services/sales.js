let products = [
    {
        id: undefined,
        price: 50
    },
    {
        id: undefined,
        price: 100
    },
    {
        id: undefined,
        price: 150
    }
];

module.exports.setupFakeData = function (ids) {
    for (let i = 0; i < products.length; ++i)
        products[i].id = ids[i];
}

module.exports.getProductDetails = function (req, result) {
    for(let product of products)
        if(product.id === req.params.id){
            result.sales = product;
            break;
        }
    console.log('from sales:')
    console.log(result.sales)
}

module.exports.onGetProductList = function (result) {
    result.on('getProductList', () => {
        result.sales = {}
        result.sales.ids = result.ids
        result.sales.priceById = []
        for (let product of products)
            if(result.ids.includes(product.id))
                result.sales.priceById.push(product)
        
        console.log('from sales:')
        console.log(result.sales)
    })
}

module.exports.onCreateProductId = function (result) { }

module.exports.createProduct = function (req, result) {
    let id = req.body.sales.productId;
    let price = req.body.sales.price
    let product = {
        id, price
    };
    products.push(product)
    result.sales = {
        productId: id,
        price
    }
    console.log('from sales:')
    console.log(result.sales)
}