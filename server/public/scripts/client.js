console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
    $('#submit').on('click', addTodo); 
    getTodos();
}

function getTodos(){
    //empty table
    $('#listTable').empty();
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log('GET response:', response);
        // Append to dom
        for (let i = 0; i < response.length; i++) {
            $('#listTable').append(`
                <tr>
                    <td>${response[i].task}</td>
                    <td><button class="complete">Complete Todo</button></td>
                    <td><button class="delete">Remove Todo</button></td>
                </tr>
            `)
        }
    });
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