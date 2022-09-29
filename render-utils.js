export function renderList(list) {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = list.item;
    li.append(p);

    return li;
}
