window.onload = function () {
    const dragSrcEl = null;

    const domqs = document.querySelector.bind(document);

    const tasks = document.querySelectorAll(".task");

    console.log(tasks);

    tasks.forEach((task) => {
        task.addEventListener("dragstart", dragStart);
        task.addEventListener("drag", drag);
        task.addEventListener("dragend", dragEnd);
    });

    function dragStart(ev) {}

    function drag(ev) {
        this.classList.add("is-dragging");
    }

    function dragEnd(ev) {
        this.classList.remove("is-dragging");
    }

    const taskList = document.querySelectorAll(".task");
    taskList.forEach((listZone) => {
        listZone.addEventListener("dragenter", dragEnter);
        listZone.addEventListener("dragover", dragOver);
        listZone.addEventListener("dragleave", dragLeave);
        listZone.addEventListener("drop", drop);
    });

    function dragEnter(ev) {
        ev.preventDefault();
    }

    function dragOver(ev) {
        ev.preventDefault();
        const taskDragged = domqs(".is-dragging");
        this.appendChild(taskDragged);
    }

    function dragLeave(ev) {
        this.classList.remove("dropEnter");
    }

    function drop(ev) {
        if (dragSrcEl) {
            const listZone = this.id.split("-")[1];
            const id = dragSrcEl.id;
            let taskMoved = arrTasks.find((task) => task.id == id);
            taskMoved.status = listZone;
        }
    }

    function addTask() {
        const inputTask = domqs("#taskText").value;
        domqs("#to-do").innerHTML =
            +`<li class='task'><p> ${inputTask} </p></li>`;
        domqs('#taskText').value = "";
    }
};
