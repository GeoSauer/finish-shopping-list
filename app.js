/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createList } from './fetch-utils.js';

import { renderList } from './render-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');

/* State */
let lists = [];
let error = null;

/* Events */

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newList = {
        item: formData.get('item'), // add 'quantity' here as well?
    };

    const response = await createList(newList);
    error = response.error;
    const list = response.data;

    if (error) {
        displayError();
    } else {
        lists.push(list);
        displayLists();
        addItemForm.reset();
    }
});

/* Display Functions */
function displayLists() {
    itemList.innerHTML = '';

    for (const list of lists) {
        const listEl = renderList(list);
        itemList.append(listEl);
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
