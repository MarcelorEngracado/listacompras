const form = document.getElementById('shopping-form');
const input = document.getElementById('item-input');
const list = document.getElementById('shopping-list');
const clearButton = document.getElementById('clear-list');

const storageKey = 'shoppingListItems';

function saveItems(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function loadItems() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
}

function createListItem(item, index) {
  const li = document.createElement('li');
  if (item.checked) {
    li.classList.add('checked');
  }

  const textSpan = document.createElement('span');
  textSpan.className = 'item-text';
  textSpan.textContent = item.text;
  li.appendChild(textSpan);

  const toggleButton = document.createElement('button');
  toggleButton.textContent = item.checked ? 'Desmarcar' : 'Comprado';
  toggleButton.className = 'toggle-button';
  toggleButton.addEventListener('click', () => {
    toggleItem(index);
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.addEventListener('click', () => {
    removeItem(index);
  });

  li.appendChild(toggleButton);
  li.appendChild(removeButton);
  return li;
}

function renderItems() {
  const items = loadItems();
  list.innerHTML = '';

  if (items.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'A lista está vazia. Adicione um item acima.';
    emptyMessage.style.color = '#666';
    list.appendChild(emptyMessage);
    return;
  }

  items.forEach((item, index) => {
    const listItem = createListItem(item, index);
    list.appendChild(listItem);
  });
}

function addItem(itemText) {
  const items = loadItems();
  items.push({ text: itemText, checked: false });
  saveItems(items);
  renderItems();
}

function removeItem(index) {
  const items = loadItems();
  items.splice(index, 1);
  saveItems(items);
  renderItems();
}

function toggleItem(index) {
  const items = loadItems();
  items[index].checked = !items[index].checked;
  saveItems(items);
  renderItems();
}

function clearItems() {
  saveItems([]);
  renderItems();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newItem = input.value.trim();

  if (newItem === '') {
    return;
  }

  addItem(newItem);
  input.value = '';
  input.focus();
});

clearButton.addEventListener('click', clearItems);

renderItems();
