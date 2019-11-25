import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import root from './reducers/root';

const initialState = {};

export default function configureStore(initialState) {
    return createStore(
        root,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
}
