const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const listContainer = document.getElementById('shopping-list');
const counter = document.getElementById('counter');
const clearBtn = document.getElementById('clear-btn');

// Load saved book targets from localStorage
let shoppingItems = JSON.parse(localStorage.getItem('rodShoppingItems')) || [];

function saveAndRender() {
    localStorage.setItem('rodShoppingItems', JSON.stringify(shoppingItems));
    renderList();
}

function renderList() {
    listContainer.innerHTML = '';
    
    shoppingItems.forEach((item, index) => {
        const li = document.createElement('li');
        if (item.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = `[Vol. ${index + 1}] ${item.text}`;
        
        // Click to toggle acquisition/reading status
        span.addEventListener('click', () => {
            shoppingItems[index].completed = !shoppingItems[index].completed;
            saveAndRender();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.title = 'Discard Volume';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            shoppingItems.splice(index, 1);
            saveAndRender();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });

    // Update counter
    counter.textContent = `Volumes cataloged: ${shoppingItems.length}`;
}

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItemText = input.value.trim();
    if (newItemText !== '') {
        shoppingItems.push({ text: newItemText, completed: false });
        input.value = '';
        saveAndRender();
    }
});

// Purge archive handler
clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to purge all acquired volume targets?")) {
        shoppingItems = [];
        saveAndRender();
    }
});

// Initial load
renderList();