document.querySelector("#add").addEventListener("click", addTodo);
const todos = document.querySelector("#todos");
const input = document.querySelector("#input");

let todoItems = [];
let ctr = 0;
let editingID = null; // Track the currently edited item

function addTodo() {
    const itemText = input.value.trim();

    if (itemText) {
        ctr++;
        todoItems.push({
            itemID: ctr,
            itemText: itemText
        });
        input.value = "";
        render();
    } else {
        alert("Please enter a to-do item.");
    }
}

function toggleEditMode(id) {
    if (editingID !== null) return; // Prevent editing multiple items at once

    editingID = id;

    const todoDiv = document.getElementById(id);
    const h1 = todoDiv.querySelector("h1");
    const editButton = todoDiv.querySelector(".edit-button");
    const saveButton = todoDiv.querySelector(".save-button");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = h1.textContent;
    inputField.classList.add("editing");

    todoDiv.replaceChild(inputField, h1);
    editButton.style.display = "none";
    saveButton.style.display = "inline";
    inputField.focus(); // Automatically focus the input field for editing
}

function saveChanges(id) {
    const todoDiv = document.getElementById(id);
    const inputField = todoDiv.querySelector("input");
    const newText = inputField.value.trim();
    const editButton = todoDiv.querySelector(".edit-button");
    const saveButton = todoDiv.querySelector(".save-button");

    if (newText) {
        todoItems = todoItems.map(todo => {
            if (todo.itemID === id) {
                todo.itemText = newText;
            }
            return todo;
        });
        editingID = null;
        render();
    } else {
        alert("Todo text cannot be empty!");
        inputField.focus();
    }

    editButton.style.display = "inline";
    saveButton.style.display = "none";
}

function deleteTodo(id) {
    if (editingID === id) {
        editingID = null;
    }
    todoItems = todoItems.filter(todo => todo.itemID !== id);
    render();
}

function render() {
    todos.innerHTML = "";
    todoItems.forEach(todo => {
        const element = createTodoComponent(todo);
        todos.appendChild(element);
    });
}

function createTodoComponent(todoItem) {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const saveButton = document.createElement("button");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    checkBox.setAttribute("id", 'checkBox');

    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            h1.style.textDecoration = "line-through";
        } else {
            h1.style.textDecoration = "none";
        }
    });

    h1.innerHTML = todoItem.itemText;

    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => deleteTodo(todoItem.itemID));

    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => toggleEditMode(todoItem.itemID));

    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.classList.add("save-button");
    saveButton.style.display = "none";
    saveButton.addEventListener("click", () => saveChanges(todoItem.itemID));

    div.setAttribute("id", todoItem.itemID);
    div.classList.add("todo-item");
    div.append(checkBox);
    div.append(h1);
    div.append(editButton);
    div.append(saveButton);
    div.append(deleteButton);

    return div;
}
