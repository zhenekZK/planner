import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';

import './index.css';
import App from './App';

const initialState = {
    users: {
        byId: {
            '0': {
                id: '0',
                name: 'Vasya',
                surname: 'Pupkin'
            }
            ,
            '1': {
                id: '1',
                name: 'Oleg',
                surname: 'Andersen'
            },
            '2': {
                id: '2',
                name: 'Sam',
                surname: 'Vinchester'
            }
        },
        allIds: ['0', '1', '2']
    },
    lists: {
        byId: {
            '0': {
                id: '0',
                title: 'My First List',
                tasks: ['a', 'b', 'c']
            },
            '1': {
                id: '1',
                title: 'My Second List',
                tasks: ['d', 'e']
            }
        },
        allIds : ['0', '1']
    },
    tasks: {
        byId : {
            'a': {
                id: 'a',
                list: '0',
                title: 'Task 1',
                priority: 2,
                description: 'Small description',
                createdBy: '2',
                status: 'open',
                assignedTo: []
            },
            'b': {
                id: 'b',
                list: '0',
                title: 'Task 2',
                priority: 1,
                description: 'Small description',
                createdBy: '1',
                status: 'open',
                assignedTo: []
            },
            'c': {
                id: 'c',
                list: '0',
                title: 'Task3',
                priority: 1,
                description: 'Small description',
                createdBy: '1',
                status: 'processing',
                assignedTo: []
            },
            'd': {
                id: 'd',
                list: '1',
                title: 'Title',
                priority: 4,
                description: 'Small description',
                createdBy: '0',
                status: 'open',
                assignedTo: []
            },
            'e': {
                id: 'e',
                list: '1',
                title: 'Title',
                priority: 5,
                description: 'Small description',
                createdBy: '2',
                status: 'done',
                assignedTo: []
            }
        },
        allIds : ['a', 'b', 'c', 'd', 'e']
    }
};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
