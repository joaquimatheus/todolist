window.onload = function () {
    const domqs = document.querySelector.bind(document);
    
    const token = new URLSearchParams(location.search).get("token");

    async function validateToken() {
        const url = `http://localhost:5555/login-token?token=${token}`;

        await fetch(url, {
            mode: "cors",
            method: "GET",
        })
        .then(async (res) => console.log(res))
        .catch((res) => console.error(res));
}

    function bindInputsForm() {
        domqs("form").addEventListener("submit", (ev) => {
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

            fetch("http://localhost:5555/set-new-password", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify(formData),
            })
            .then((res) => {
                console.log(res);
                alert("Password update!");
            })
            .catch((res) => console.error(res));
        });
    }
    bindInputsForm();
};
