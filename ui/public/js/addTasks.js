window.onload = async () => {
    await window.app.demandValidUser();
    const { domqs, ajaxAdapter } = window.app;

    domqs('form').addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const formData = {
            title: domqs('input').value
        };

        try {
            await ajaxAdapter('POST', 'tasks', formData);
            window.location.href = '/tasks';
        } catch (ex) {
            console.error(ex);
            alert(ex.message);
        }
    })
}
