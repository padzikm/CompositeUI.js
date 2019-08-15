import { AllActions } from './actions';

export interface State {
    productIds: string[]
    newProductId?: string
    productPriceById: { id: string, price: number }[]
    creatingProductId: boolean
    creatingProduct: boolean
}

export type RootState = {
    sales: State
}

const initialState: State = {
    productIds: [],
    productPriceById: [],
    creatingProductId: false,
    creatingProduct: false
}

function concatProducts<T extends { id: string }>(current: T[], incoming: T[]): T[] {
    return incoming.concat(current.filter(p => incoming.find(q => q.id === p.id) == undefined))
}

const rootReducer = (state: State = initialState, action: AllActions): State => {
    switch (action.type) {
        case 'GetProductDetails':
            return {
                ...state, productIds: [...state.productIds, action.id],
                productPriceById: concatProducts(state.productPriceById, [{ id: action.id, price: action.sales.price }])
            };
        case 'GetProductList':
            return {
                ...state, productIds: [...state.productIds, ...action.sales.ids],
                productPriceById: concatProducts(state.productPriceById, action.sales.priceById)
            }
        case 'CreatingProductId':
            return { ...state, creatingProductId: true }
        case 'CreateProductId':
            return { ...state, newProductId: action.id, creatingProductId: false }
        case 'CreatingProduct':
            return {...state, creatingProduct: true }
        case 'CreateProduct':
            return {
                ...state, newProductId: undefined, productIds: [...state.productIds, action.id], creatingProduct: false, 
                productPriceById: concatProducts(state.productPriceById, [{ id: action.id, price: action.sales.price }])
            }
        default:
            return state;
    }
}

export { rootReducer as sales }