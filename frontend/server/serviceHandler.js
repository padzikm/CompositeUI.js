const uuidv1 = require('uuid/v1');
const requireDir = require('require-dir')
const EventEmitter = require('events')

let serviceModules = requireDir('./services');
let services = [];

for(moduleName in serviceModules)
    services.push(serviceModules[moduleName])

function callServices(command, ...args){
    for(let service of services){
        if(service[command])
            service[command](...args)
    }
}

module.exports.setupFakeData = function(){
    let ids = []
    for(let i = 0; i < 3; ++i)
        ids.push(uuidv1())

    callServices('setupFakeData', ids)
}

module.exports.getProductDetails = function(req){
    let result = new EventEmitter();
    callServices('onGetProductDetails', result)
    callServices('getProductDetails', req, result)
    return result;
}

module.exports.getProductList = function(req){
    let result = new EventEmitter();
    callServices('onGetProductList', result)
    callServices('getProductList', req, result)
    return result;
}

module.exports.createProductId = function(req){
    let result = new EventEmitter();
    callServices('onCreateProductId', result)
    callServices('createProductId', req, result)
    return result;
}

module.exports.createProduct = function(req){
    let result = new EventEmitter();
    callServices('onCreateProduct', result)
    callServices('createProduct', req, result)
    return result;
}

