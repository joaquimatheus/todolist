const token = new URLSearchParams(location.search).get("token");

async function validateToken() {
    const { apiUrl } = window.app.config

    try {
        await fetch(`${apiUrl}/login-token?token=${token}`, {
            mode: 'cors',
            method: 'GET',
        });
    } catch (ex) {
        console.error(ex);

        location.href = '/login';
    }
}

window.onload = function () {
    const { domqs, ajaxAdapter } = window.app;
    validateToken();

    domqs("form").addEventListener("submit", async (ev) => {
        ev.preventDefault();

        validateToken();

        let formData = {
            password: domqs("#password").value,
            confirmPassword: domqs("#new-password").value,
            token,
        };

        if (formData.password !== formData.confirmPassword) {
            alert(`Password don't match`);
            return;
        }

        try {
            await ajaxAdapter('POST', 'set-new-password', formData);

            alert("Password updated!")
            location.href = '/login'
        } catch (ex) {
            console.error(ex);
            alert(ex.message);
        }
    });
}

