console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
    $('#submit').on('click', addTodo); 
    $('#listTable').on('click', '.delete', deleteBtn);
    $('#listTable').on('click', '.complete', completeBtn)
    getTodos();
}

function getTodos(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        appendToDom(response);
    }).catch(function(error){
        console.log(error);    
    });
}

function appendToDom(array){
    $('#listTable').empty();
    console.log('Array:', array);
    for (let i = 0; i < array.length; i++) {
        if(array[i].completed_status === true){
            $('#listTable').append(`
                <tr data-id=${array[i].id}>
                    <td class="strikeThrough taskName completed">
                        <span class="checkMark"><i class="fas fa-check checkMark"></i></span>
                        ${array[i].task}
                    </td>
                    <td class="completed">Task Completed!</td>
                    <td class="completed"><button class="delete btn btn-danger">Remove To-Do</button></td>
                </tr>
            `)            
        } else {
            $('#listTable').append(`
            <tr data-id=${array[i].id}>
                <td class="taskName">${array[i].task}</td>
                <td><button class="complete btn btn-success">Complete Task</button></td>
                <td><button class="delete btn btn-danger">Remove To-Do</button></td>
            </tr>
        `)  
        }
    }
}

function addTodo(){
    console.log('addTodo clicked');
    if($('#newTodoInput').val() === ''){
        return alert('Input a task in the field!')
    } else {
    
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
        });

    }
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

function completeBtn(){
    console.log('completed Btn clicked');
    let completedId = $(this).closest('tr').data('id');
    console.log('clicked', completedId);

    $.ajax({
        method: 'PUT',
        url: `/tasks/completed/${completedId}`,
        data: {completedStatus: true}
    }).then(function(response){
        console.log('ajax PUT response:', response);
        getTodos();
    }).catch(function(error){
        console.log('ERROR in ajax PUT:', error);
    });
    
} 