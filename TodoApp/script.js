const form = document.getElementById("form");
const respon = document.getElementById("input");
const todosLS = document.getElementById("todos");



// const mysql = require('mysql');

// let connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'todo'
//   });
  
//   connection.connect(function (err) {
//     if (err) throw err;
//     var sorgu = ("INSERT INTO todo SET ? ",respon);
    
//     console.log('MySQL bağlantısı  gerçekleştirildi.');
  
//   });


const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        TodoEkle(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    TodoEkle();
});


function tikla(){
    TodoEkle();
};


function TodoEkle(todo) {
    let todoText = respon.value;
 

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
            
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");


            Guncell();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            Guncell();
        });

        todosLS.appendChild(todoEl);

        respon.value = "";


        Guncell();
    }
}

function Guncell() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}