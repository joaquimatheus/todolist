window.onload = function () {
    const domqs = document.querySelector.bind(document);

    function getInputsForm() {
        domqs("form").addEventListener("submit", (ev) => {
            ev.preventDefault();
            let formData = {
                email: domqs("#email").value,
                password: domqs("#password").value,
            };

            fetch("http://localhost:5555/login", {
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify(formData),
            })
            .then((res) => {
                console.log(res)
                location.href = '/tasks';
            })
            .catch((res) => {
                console.error(res);
            });
        });
    }

    getInputsForm();
};
