window.onload = function () {
    const { domqs, ajaxAdapter } = window.app;

    domqs('form').addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const formData = {
            email: domqs('#email').value
        }

        console.log(formData);

        try {
            await ajaxAdapter('POST', 'forget-password', formData);

            alert('Instruction sent to your email');
            location.href = '/login'
        } catch (ex) {
            console.error(ex);
            alert(ex.message);
        }
    })
};
