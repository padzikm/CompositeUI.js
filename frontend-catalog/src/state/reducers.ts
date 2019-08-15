import { AllActions } from './actions'

export interface State {
    productIds: string[];
    newProductId?: string;
    productQuantityById: { id: string, quantity: number }[];
}

export type RootState = {
    catalog: State
}

const initialState: State = {
    productIds: [],
    productQuantityById: []
}

function concatProducts<T extends { id: string }>(current: T[], incoming: T[]): T[] {
    return incoming.concat(current.filter(p => incoming.find(q => q.id === p.id) == undefined))
}

const rootReducer = (state: State = initialState, action: AllActions): State => {
    switch (action.type) {
        case 'GetProductDetails':
            return {
                ...state, productIds: [...state.productIds, action.id],
                productQuantityById: concatProducts(state.productQuantityById, 
                    [{ id: action.id, quantity: action.catalog.quantity }])
            };
        case 'GetProductList':
            return {
                ...state, productIds: [...state.productIds, ...action.catalog.ids],
                productQuantityById: concatProducts(state.productQuantityById, action.catalog.quantityById)
            };
        case 'CreateProductId':
            return { ...state, newProductId: action.id }
        case 'CreateProduct':
            return {...state, newProductId: undefined, productQuantityById: concatProducts(state.productQuantityById, 
                [{ id: action.id, quantity: action.catalog.quantity }])}
        default:
            return state;
    }
}

export { rootReducer as catalog }