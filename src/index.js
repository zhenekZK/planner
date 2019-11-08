import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';

import './index.css';
import App from './App';

const initialState = {
    lists: {
        byId: {
            '0': {
                id: 0,
                title: 'My First List'
            },
            '1': {
                id: 1,
                title: 'My Second List'
            }
        },
        allIds : ['0', '1']
    },
    tasks: {
        byId : {
            '0': {
                id: 0,
                list: 0,
                title: 'Task 1',
                priority: 2,
                description: 'Small description',
                createdBy: 'id of author',
                status: 'open',
                assignedTo: []
            },
            '1': {
                id: 1,
                list: 0,
                title: 'Task 2',
                priority: 0,
                description: 'Small description',
                createdBy: 'id of author',
                status: 'open',
                assignedTo: []
            },
            '2': {
                id: 2,
                list: 0,
                title: 'Task3',
                priority: 1,
                description: 'Small description',
                createdBy: 'id of author',
                status: 'open',
                assignedTo: []
            },
            '3': {
                id: 3,
                list: 1,
                title: 'Title',
                priority: 0,
                description: 'Small description',
                createdBy: 'id of author',
                status: 'open',
                assignedTo: []
            },
            '4': {
                id: 4,
                list: 1,
                title: 'Title',
                priority: 0,
                description: 'Small description',
                createdBy: 'id of author',
                status: 'open',
                assignedTo: []
            }
        },
        allIds : ['0', '1', '2', '3', '4']
    }
};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
