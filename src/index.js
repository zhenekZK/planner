import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';

import './index.css';
import App from './App';

const initialState = {
    lists: [
        {
            title: 'My First List',
            tasks: [
                {
                    title: 'Task 1',
                    priority: 2,
                    description: 'Small description',
                    createdBy: 'id of author',
                    status: 'open',
                    assignedTo: []
                },
                {
                    title: 'Task 2',
                    priority: 0,
                    description: 'Small description',
                    createdBy: 'id of author',
                    status: 'open',
                    assignedTo: []
                },
                {
                    title: 'Task3',
                    priority: 1,
                    description: 'Small description',
                    createdBy: 'id of author',
                    status: 'open',
                    assignedTo: []
                }
            ]
        },
        {
            title: 'My Second List',
            tasks: [
                {
                    title: 'Title',
                    priority: 0,
                    description: 'Small description',
                    createdBy: 'id of author',
                    status: 'open',
                    assignedTo: []
                },
                {
                    title: 'Title',
                    priority: 0,
                    description: 'Small description',
                    createdBy: 'id of author',
                    status: 'open',
                    assignedTo: []
                }
            ]
        }
    ]
};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
