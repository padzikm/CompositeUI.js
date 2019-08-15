import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './serviceReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const configureStore = () => {

    const middlewareEnhancer = applyMiddleware(thunkMiddleware);

    const enhancers = [middlewareEnhancer]

    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, composedEnhancers);

    return store;
}
