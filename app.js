/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createList, getList, boughtList, deleteAllLists } from './fetch-utils.js';

import { renderList } from './render-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');
const deleteButton = document.getElementById('delete-button');

/* State */
let lists = [];
let error = null;

/* Events */

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newList = {
        item: formData.get('item'), // add 'quantity' here as well?
        quantity: formData.get('quantity'),
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

window.addEventListener('load', async () => {
    const response = await getList();

    error = response.error;
    lists = response.data;

    if (error) {
        displayError();
    }
    if (lists) {
        displayLists();
    }
});

deleteButton.addEventListener('click', async () => {
    const response = await deleteAllLists();
    error = response.error;

    if (error) {
        displayError();
    } else {
        lists = [];

        displayLists();
    }
});

/* Display Functions */
function displayLists() {
    itemList.innerHTML = '';

    for (const list of lists) {
        const listEl = renderList(list);
        itemList.append(listEl);

        listEl.addEventListener('click', async () => {
            const response = await boughtList(list.id);
            error = response.error;
            const updatedList = response.data;

            if (error) {
                displayError();
            } else {
                const index = lists.indexOf(list);
                lists[index] = updatedList;
                displayLists();
            }
        });
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
