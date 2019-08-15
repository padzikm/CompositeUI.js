import { AllActions } from './actions';

export interface State {
    productIds: string[]
    newProductId?: string
    productNameById: { id: string, name: string }[]
    productDescriptionById: { id: string, description: string }[],
    loadingProductDetails: boolean,
}

export type RootState = {
    marketing: State
}

const initialState: State = {
    productIds: [],
    productNameById: [],
    productDescriptionById: [],
    loadingProductDetails: false,
}

function concatProducts<T extends { id: string }>(current: T[], incoming: T[]): T[] {
    return incoming.concat(current.filter(p => incoming.find(q => q.id === p.id) == undefined))
}

const rootReducer = (state: State = initialState, action: AllActions): State => {
    switch (action.type) {
        case 'LoadingProductDetails':
            return { ...state, loadingProductDetails: true }
        case 'GetProductDetails':
            return {
                ...state, productIds: [...state.productIds, action.id],
                productNameById: concatProducts(state.productNameById, [{ id: action.id, name: action.marketing.name }]),
                productDescriptionById: concatProducts(state.productDescriptionById, [{ id: action.id, description: action.marketing.description }]),
                loadingProductDetails: false
            };
        case 'GetProductList':
            return {
                ...state, productIds: [...state.productIds, ...action.marketing.ids],
                productNameById: concatProducts(state.productNameById, action.marketing.nameById),
                productDescriptionById: concatProducts(state.productDescriptionById, action.marketing.descriptionById)
            }
        case 'CreateProductId':
            return { ...state, newProductId: action.id }
        case 'CreateProduct':
            return {
                ...state, newProductId: undefined, productIds: [...state.productIds, action.id],
                productNameById: concatProducts(state.productNameById, [{ id: action.id, name: action.marketing.name }]),
                productDescriptionById: concatProducts(state.productDescriptionById, [{ id: action.id, description: action.marketing.description }]),
            }
        default:
            return state;
    }
}

export { rootReducer as marketing }