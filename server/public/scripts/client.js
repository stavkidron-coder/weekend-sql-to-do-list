console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
    $('#submit').on('click', addTodo); 
}

function getTodos(){
    console.log('In GET todos');
}

function addTodo(){
    console.log('addTodo clicked');
    
    let newTodo = {
        task: $('#newTodoInput').val()
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTodo
    }).then(function (response) {
        $('#newTodoInput').val('');
        console.log('Response:', response);
        getTodos();
    })
}