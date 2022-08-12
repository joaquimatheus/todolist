async function finishTask() {
    const { ajaxAdapter, domqs } = window.app; 
    domqs(`tr[data-id="${taskId}"]`).remove();

    try {
        await ajaxAdapter(`DELETE', 'task?id=${taskId}`)
    } catch (ex) {
        alert(ex.message);
        console.error(ex);
    }
}

function bindTaskEvent() {
    const elements = document.querySelectorAll('table tbody tr input');
    for (const element of elements) {
        element.addEventListener('click', (ev) => {
            const taskId = element.value;
            finishTask(taskId);
        })
    }
}

async function loadTasks() {
    const { domqs, ajaxAdapter } = window.app;

    try {
        const { tasks } = await ajaxAdapter('GET', 'tasks');
        const html = tasks.map((t) => `
            <tr data id='${t.id}'>
                <td style='width: 25px; text-align: center'>
                    <input type='checkbox' value='${t.id}'>
                </td>
                <td>${t.title}</td>
            </tr>
        `).join('');

        domqs('table tbody').innerHTML = html;
    } catch (ex) {
        console.error(ex);
        alert(ex.message);
    }
}

window.onload = async() => {
    await this.app.demandValidUser();
    loadTasks();
}
