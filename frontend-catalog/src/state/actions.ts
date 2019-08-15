import * as Actions from '@service/actions'

interface GetProductDetails extends Actions.GetProductDetails {
    catalog: {
        quantity: number
    }
}

interface GetProductList extends Actions.GetProductList {
    catalog: {
        ids: string[],
        quantityById: {id: string, quantity: number}[]
    }
}

interface CreateProduct extends Actions.CreateProduct{
    catalog:{
        productId: string
        quantity: number
    }
}

export type AllActions = GetProductDetails | GetProductList | Actions.CreateProductId | CreateProduct