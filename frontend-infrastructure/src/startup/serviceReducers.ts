import { combineReducers } from 'redux'
import { loadServiceStates } from './serviceStates';


function loadServiceReducers() {
    let serviceStates = loadServiceStates()

    let reducers = {};

    for (let serviceStateModule of serviceStates) {
        for (let ownProperty in serviceStateModule) {
            let serviceReducer = serviceStateModule[ownProperty];
            reducers = { ...reducers, [ownProperty]: serviceReducer }
        }
    }

    return reducers;
}

let reducers = loadServiceReducers();

let rootReducer = combineReducers(reducers)

export { rootReducer }