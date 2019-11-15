import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers/root';

const initialState = {
    currentUser: {},
    lists: {}
};

export default function configureStore(initialState) {

    const listData = {
        lists: [
            {
                "id": 1,
                "title": "My first list",
                "tasks": [
                    {
                        "id": 1,
                        "title": "first task",
                        "description": "i am first epta",
                        "status": "open",
                        "priority": "low",
                        "list": 1,
                        "owner": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": "My second list",
                "tasks": []
            },
            {
                "id": 3,
                "title": "my third list",
                "tasks": []
            },
            {
                "id": 4,
                "title": "nmbjghjmdsfsdf",
                "tasks": []
            },
            {
                "id": 5,
                "title": "task 4",
                "tasks": []
            },
            {
                "id": 6,
                "title": "task 44",
                "tasks": []
            },
            {
                "id": 7,
                "title": "ouioiuo",
                "tasks": []
            },
            {
                "id": 8,
                "title": "tgsgtsrd",
                "tasks": []
            },
            {
                "id": 9,
                "title": "hdhd",
                "tasks": []
            },
            {
                "id": 10,
                "title": "sdfsdfs",
                "tasks": []
            }
        ]
    };

    return createStore(
        root,
        initialState,
        applyMiddleware(thunk)
    );
}
