// Select DOM Elements
const input = document.getElementById('todo-input'); //document.getElementById() means go to HTML and give me this element
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
// Load from localStorage
const saved = localStorage.getItem('todos'); //this gets saved data from string
const todos = saved ? JSON.parse(saved) : []; // JSON.parse(saved) converts string to array and ternary operator saved?JSON.parse(saved):[] means if saved exists use it else use empty array
// Save function
function saveTodos() { //this function is going to save current todos in to browsre memory
    // setItem creates or updates the ITEM because if it already exists it overwrite it
    localStorage.setItem('todos', JSON.stringify(todos)); //local storage only stores strings so we convert array into string 
}
// Create Todo Node
function createTodoNode(todo, index) { //this function creates one todo item UI
    const li = document.createElement('li'); //we are creating a HTML using Js
    li.className = "flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg shadow-sm"; //tailwind css applied
    // Left side (checkbox + text)
    const leftDiv = document.createElement('div'); //it is a container which holds checkbox and text
    leftDiv.className = "flex items-center gap-2"; //tailwind css applied
    // Checkbox
    // this whole part means if task completed checkbox checked
    const checkbox = document.createElement('input'); //creating ans HTML element by using Js
    checkbox.type = 'checkbox'; //just like HTML
    checkbox.checked = todo.completed; 
    // Text
    const textSpan = document.createElement('span'); //this creates a HTML element which is span 
    textSpan.textContent = todo.text; //shows todo text
    textSpan.className = "cursor-pointer"; //tailwind css
    if (todo.completed) { //if completed then style applied
        textSpan.classList.add("line-through", "text-gray-400");
    }
    // Checkbox toggle
    checkbox.addEventListener("change", () => { //this is going to run when the checkbox is clicked
        todo.completed = checkbox.checked; //so we update the data 
        textSpan.classList.toggle("line-through"); //add remove strike line
        textSpan.classList.toggle("text-gray-400");
        saveTodos(); //this is going to save the changes
    });
    // Edit on double click
    textSpan.addEventListener("dblclick", () => { //so now we have added a eventlistner if we double click on the text then we can update the text
        const newText = prompt("Edit todo", todo.text); //this is for popup input
        if (newText && newText.trim() !== "") {
            todo.text = newText.trim(); //used for update the value
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });
    // Delete button
    const delBtn = document.createElement('button'); //creates a HTML element 
    delBtn.textContent = "Delete"; //thsi means that in the delete button Delete will be written
    delBtn.className = "text-red-500 hover:text-red-700 font-medium";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1); //remove from array
        render(); //refresh array
        saveTodos();
    });
    // next 4 lines builds structure
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(textSpan);
    li.appendChild(leftDiv);
    li.appendChild(delBtn);
    return li;
}
// Render function
function render() {
    list.innerHTML = ''; //this clear old lists
    todos.forEach((todo, index) => { //loop through array
        const node = createTodoNode(todo, index); //this create UI +add to page
        list.appendChild(node);
    });
}
// Add Todo
function addTodo() {
    const text = input.value.trim(); //this gets user input
    if (!text) return; //prevent empty todo
    todos.push({ text, completed: false }); //add new todo
    input.value = ''; //clear input
    render(); //update UI 
    saveTodos();//saves
}
// Button click
addBtn.addEventListener("click", addTodo); //button click if this button gets clicked then addTodo function will execute
// Enter key support 🔥
input.addEventListener("keydown", (e) => { //press enter add todo
    if (e.key === "Enter") {
        addTodo();
    }
});
// Initial render
render(); //initial render means it is going to load saved todos on page load