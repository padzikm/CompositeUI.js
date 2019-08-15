const express = require('express')
const app = express()
const port = 3000
const serviceHandler = require('./serviceHandler')

serviceHandler.setupFakeData()

app.use(express.static('build'))

app.use(express.json())

app.use('/', express.static('build'))

app.get('/getProductDetails/:id', (req, res) => {
    console.log('getProductDetails:')
    let result = serviceHandler.getProductDetails(req)
    res.json(result)
})

app.get('/getProductList', (req, res) => {
    console.log('getProductList:')
    let result = serviceHandler.getProductList(req)
    res.json(result)
})

app.post('/createProductId', (req, res) => {
    console.log('createProductId:')
    let result = serviceHandler.createProductId(req)
    res.json(result)
})

app.post('/createProduct', (req, res) => {
    console.log('createProduct:')
    let result = serviceHandler.createProduct(req)
    res.json(result)
})

app.use('*', express.static('build'))

app.listen(port, () => console.log(`SOA CompositeUI.js listening on port ${port}!`))