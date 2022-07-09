window.onload = function () {
    const domqs = document.querySelector.bind(document);

    function bindInputsForm() {
        domqs("form").addEventListener("submit", (ev) => {
            ev.preventDefault();

            let formData = {
                email: domqs("#email").value,
            };

            fetch("http://localhost:5555/forget-password", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify(formData),
            })
            .then((res) => {
                alert("Sending recover password yo your email");
            })
            .catch((res) => console.error(res));
        });
    }

    bindInputsForm();
};
