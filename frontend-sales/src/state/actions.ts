import * as Actions from '@service/actions'

interface GetProductDetails extends Actions.GetProductDetails{
    sales: {
        price: number
    }
}

interface GetProductList extends Actions.GetProductList {
    sales: {
        ids: string[],
        priceById: {id: string, price: number}[]
    }
}

interface CreatingProductId {
    type: 'CreatingProductId'
}

export interface CreatingProduct {
    type: 'CreatingProduct'
}

interface CreateProduct extends Actions.CreateProduct{
    sales: {
        productId: string
        price: number
    }
}

export type AllActions = GetProductDetails | GetProductList | CreatingProductId | Actions.CreateProductId | CreatingProduct | CreateProduct