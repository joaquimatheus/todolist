window.onload = function () {
    const { domqs, ajaxAdapter } = window.app;

    domqs('form').addEventListener('submit', async(ev) => {
        ev.preventDefault();

        let formData = {
            name: domqs('#username').value,
            email: domqs('#email').value,
            password: domqs('#password').value,
            confirm_password: domqs('#confirm_password').value
        }

        if(formData.password != formData.confirm_password) {
            alert("Passwords don't match ");
            return;
        }

        try {
            const response = await ajaxAdapter('POST', 'signup', formData);

            alert(`User created, your user id is: ${response.userId}`)
            location.href = '/login'
        } catch (ex) {
            console.error(ex);
            alert(ex.message);
        }
    })
};
