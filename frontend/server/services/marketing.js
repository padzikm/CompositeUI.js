const uuidv1 = require('uuid/v1');

let products = [
    {
        id: undefined,
        name: 'Air',
        description: 'Bottled mountain air',
    },
    {
        id: undefined,
        name: 'Ring',
        description: 'Golden sauron ring',
    },
    {
        id: undefined,
        name: 'Uranium',
        description: 'Atomic power',
    }
]


module.exports.setupFakeData = function (ids) {
    for (let i = 0; i < products.length; ++i)
        products[i].id = ids[i];
}

module.exports.getProductDetails = function (req, result) {
    for (let product of products)
        if (product.id === req.params.id) {
            result.marketing = product;
            break;
        }
    console.log('from marketing:')
    console.log(result.marketing)
}

module.exports.onGetProductList = function (result) {
    result.on('getProductList', () => {
        result.marketing = {}
        result.marketing.ids = result.ids
        result.marketing.nameById = []
        result.marketing.descriptionById = []
        for (let product of products) {
            if (result.ids.includes(product.id)) {
                result.marketing.nameById.push({ id: product.id, name: product.name })
                result.marketing.descriptionById.push({ id: product.id, description: product.description })
            }
        }
        console.log('from marketing:')
        console.log(result.marketing)
    })
}

module.exports.createProductId = function (req, result) {
    result.id = uuidv1();
    console.log('from marketing:')
    console.log(result.id)
    result.emit('createProductId');
}

module.exports.createProduct = function (req, result) {
    let id = req.body.marketing.productId
    let name = req.body.marketing.name
    let description = req.body.marketing.description;
    let product = {
        id,
        name,
        description
    }
    products.push(product)
    result.marketing = {
        productId: id,
        name,
        description
    }
    console.log('from marketing:')
    console.log(result.marketing)
}
