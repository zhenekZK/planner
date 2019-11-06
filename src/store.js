import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers/root';

export default function configureStore(initialState = {}) {
    return createStore(
        root,
        initialState,
        applyMiddleware(thunk)
    );
}
