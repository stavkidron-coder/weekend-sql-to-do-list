console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
    $('#submit').on('click', addTodo); 
    $('#listTable').on('click', '.delete', deleteBtn);
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
                <tr data-id=${response[i].id}>
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

function deleteBtn(){
    console.log('deleteBtn clicked');
    let taskId = $(this).closest('tr').data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log('Delete Btn response:', response);
        getTodos();
    }).catch(function(error){
        console.log('ERROR in deleteBtn:', error);
    });
}