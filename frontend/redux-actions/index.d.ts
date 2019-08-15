export interface ReduxAction {
    type: string
}

export interface GetProductDetails extends ReduxAction {
    type: 'GetProductDetails',
    id: string,
}

export interface GetProductList extends ReduxAction {
    type: 'GetProductList';
    ids: string[];
}

export interface CreateProductId extends ReduxAction {
    type: 'CreateProductId',
    id: string
}

export interface CreateProduct extends ReduxAction {
    type: 'CreateProduct',
    id: string,
    [key: string]: unknown
}