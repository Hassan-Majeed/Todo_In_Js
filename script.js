const todoList = []
let serNo = ''
let updatingIndex = -1
let addBtn = document.getElementById('addbtn')
addBtn.addEventListener('click', submitData)

let updateBtn = document.getElementById('update')
updateBtn.addEventListener('click', updateTodo)
let d = new Date()
let createDate = d.getDate()
let createMonth = d.getMonth()
let createYear = d.getFullYear()
let createHour = d.getHours()
let createMin = d.getMinutes()
let createSec = d.getSeconds()
let fullDate = createDate + '/' + createMonth + '/' + createYear + ' ' + createHour + ':' + createMin + ':' + createSec

function submitData() {
  let inpValue = document.getElementById('inpVal').value;
  const todoObj = {
    id: ++serNo,
    todoContent: inpValue,
    todoDate: fullDate,
    isChecked: false
  }

  if (inpValue != '') {
    todoList.push(todoObj);
    document.getElementById('inpVal').value = ''
    showList()
  } else {
    alert('Input field not null !')
  }
}

let list = document.getElementById('todoList')

function showList() {
  list.innerHTML = ''
  todoList.forEach(function (items, index) {
    // to do text
    let lis = document.createElement("li");
    list.appendChild(lis)
    lis.innerText = items.todoContent

    // print serial No
    let ser_no = document.createElement("span");
    lis.appendChild(ser_no)
    ser_no.innerText = index + 1
    //  Add classes to element
    ser_no.classList.add('serialNum');

    // print Date
    let todo_Date = document.createElement("p");
    lis.appendChild(todo_Date)
    todo_Date.innerText = items.todoDate

    // create div for buttons
    let div = document.createElement("div");
    lis.appendChild(div)
    div.classList.add('text-right');

    // mark as done Edit And Delete Button
    let editButton = document.createElement("button");
    editButton.classList.add('primbtn', 'editbtn');
    editButton.innerHTML = "Edit";
    div.appendChild(editButton)

    editButton.addEventListener('click', function (e) {
      editTodo(index)
      addBtn.style.display = 'none'
      updateBtn.style.display = 'block'
    })

    let deleteButton = document.createElement("button");
    deleteButton.classList.add('primbtn', 'delBtn');
    deleteButton.innerHTML = "Delete";
    div.appendChild(deleteButton)

    deleteButton.addEventListener('click', function (e) {
      let isExecuted = confirm('Are you sure to delete?')
      if (isExecuted) {
        alert("Delete successfully executed");
        deleteList(index)
      } else {
        alert("Delete canceled");
      }
    })

    let markDone = document.createElement("button");
    markDone.classList.add('primbtn', 'markDone');
    markDone.innerHTML = "Mark as Done";
    div.appendChild(markDone)

    markDone.addEventListener('click', function () {
      lis.style.textDecoration = "line-through"
      items.isChecked = true
      markDone.innerHTML = "Mark as Undo";
    })

  });
  console.log(todoList)

}
// Delete List
function deleteList(index) {
  todoList.splice(index, 1)
  showList()
}
// edit todo function
function editTodo(index) {
  document.getElementById('inpVal').value = todoList[index].todoContent
  console.log("todoList[index].value", todoList[index].todoContent)
  updatingIndex = index
}
function updateTodo() {
  todoList[updatingIndex].todoContent = document.getElementById('inpVal').value
  alert('Todo Update Successfully')
  showList()
  document.getElementById('inpVal').value = ''
  addBtn.style.display = 'block'
  updateBtn.style.display = 'none' 
}
function clearAll() {
  todoList.splice(0, todoList.length)
  showList()
}