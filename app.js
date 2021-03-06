const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');



const generateTemplate = todo => {
    let html = `    
     <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
};


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length){
    generateTemplate(todo);
    addForm.reset();

    

    localStorage.setItem('todo', JSON.stringify(todo));
    }
    const stored = localStorage.getItem('todo');
    console.log(JSON.parse(stored));
});


list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        localStorage.removeItem('todo', e);
    }
});


const filterTodos = (term) => {
    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase()
    .includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase()
    .includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};


search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});


let loader = document.querySelector('#loader');

const loadNow = (opacity) => {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.04);
        }, 50);
    }
};


const displayContent = () => {
    loader.style.display = 'none';
    document.getElementById('content').style.display = 'block';
};


document.addEventListener("DOMContentLoaded", () => {
    loader = document.getElementById('loader');
    loadNow(1);
});
