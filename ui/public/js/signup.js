window.onload = function () {
    const domqs = document.querySelector.bind(document);

    function getInputsForm() {
        domqs("form").addEventListener("submit", (ev) => {
            ev.preventDefault();
            let formData = {
                name: domqs("#username").value,
                email: domqs("#email").value,
                password: domqs("#password").value,
            };

            fetch("http://localhost:5555/signup", {
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify(formData),
            })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.error(res);
            });
        });
    }

    getInputsForm();
};
