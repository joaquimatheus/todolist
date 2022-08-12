window.onload = function () {
    const { domqs, ajaxAdapter } = window.app;

    domqs('form').addEventListener('submit', async (ev) => {
        ev.preventDefault();

        let formData = {
            email: domqs('#email').value,
            password: domqs('#password').value
        }

        try {
            const { accounts, token } = await ajaxAdapter(
                'POST',
                'login',
                formData
           );

            localStorage.setItem('jwt', token);
            localStorage.setItem('accounts', JSON.stringify(accounts))

            alert('Logged in');
            location.href = '/tasks';
        } catch (ex) {
            console.error(ex);
            alert(ex.message);
        }
    })
};
