


const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");




let tasks = JSON.parse(localStorage.getItem("tasks")) || [];




function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;

        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        

        span.onclick = function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

        };

      

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {

            tasks.splice(index, 1);

            saveTasks();

        };

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

    updateCount();

}




function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

}




function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}




function updateCount() {

    document.getElementById("totalTasks").textContent = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("emptyMessage").style.display =
        tasks.length === 0 ? "block" : "none";

}




taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});




displayTasks();
