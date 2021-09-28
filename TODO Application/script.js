// UI variables

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items ;
//call event listener
eventListener();


function eventListener() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener("click", deleteItem);

    //delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);

    //Load Items
    loadItems();
}


//Add new Item
function addNewItem(e) {

    if (input.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This field cannot be empty!',
        })
    }
    else {
        createItem(input.value);
        setItemToLS(input.value);
        input.value = "";
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'New task added successfully!'
        })
    }
    e.preventDefault();
}


function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                const task = e.target.parentElement.parentElement;
                
                deleteItemFromLS(task.textContent);
                task.remove();
                
                Swal.fire(
                    'Deleted!',
                    'Your tasks has been deleted.',
                    'success'
                );
            }
        })
    }
    e.preventDefault();
}

function deleteAllItems(e) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            taskList.innerHTML = "";


            Swal.fire(
                'Deleted!',
                'Your tasks has been deleted.',
                'success'
            );
        }
    })

    e.preventDefault();
}

function loadItems(){
    items = getItemsForLS();
    items.forEach(function(item){
        createItem(item);
    })
}

function getItemsForLS(){
    if(localStorage.getItem('items') === null)
    {
        items = [];
    }
    else
    {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text){
    items = getItemsForLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));

}

function createItem(text){
        const newTask = document.createElement("li");
        newTask.className = "list-group-item list-group-item-secondary";
        newTask.appendChild(document.createTextNode(text));

        const deleteButton = document.createElement("a");
        deleteButton.href = "#";
        deleteButton.className = "delete-item float-right";
        const X_seymbol = document.createElement("i");
        X_seymbol.className = "fas fa-times";

        deleteButton.appendChild(X_seymbol);
        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);


}

function deleteItemFromLS(text){
    items = getItemsForLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
            
        }
        localStorage.setItem('items', JSON.stringify(items));
    })
}