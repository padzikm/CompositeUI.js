import * as Actions from '@service/actions'

interface GetProductDetails extends Actions.GetProductDetails{
    marketing: {
        name: string,
        description: string
    }
}

interface GetProductList extends Actions.GetProductList{
    marketing: {
        ids: string[],
        nameById: {id: string, name: string}[],
        descriptionById: {id: string, description: string}[]
    }
}

export interface LoadingProductDetails {
    type: 'LoadingProductDetails'
}

interface CreateProduct extends Actions.CreateProduct{
    marketing: {
        productId: string,
        name: string,
        description: string
    }
}

export type AllActions = GetProductDetails | GetProductList | LoadingProductDetails | Actions.CreateProductId | CreateProduct