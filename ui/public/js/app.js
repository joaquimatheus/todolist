window.app = {
    config: { apiUrl: 'http://localhost:5555' },
    domqs: document.querySelector.bind(document),

    async demandValidUser() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) { return window.location.href = '/login' }

        try {
            const { user } = await window.app.ajaxAdapter('GET', 'user')
            window.app.user = user;
        } catch (ex) {
            console.log(ex);

            alert(ex.message || 'Invalid user');
            window.location.href = '/login';
        }
    }
}

window.app.ajaxAdapter = async ( method, url, body, headers = {}) => {
    headers['Content-Type'] = 'application/json';;
    
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        headers['Authorization'] = `Bearer ${jwt}`;
    }

    const accounts = localStorage.getItem('accounts');

    if (accounts) {
        const firstAccount = JSON.parse(accounts)[0];
        headers['account_id'] = firstAccount.id;
    }

    const response = await fetch(`${window.app.config.apiUrl}/${url}` , {
        method,
        headers,
        body: JSON.stringify(body)
    });

    const jsonResponse = await response.json();

    if (response.status == 401) {
        window.location.href = 'login';
        throw new Error('Unauthorized');
    }

    if (response.status !== 200) {
        throw new Error(jsonResponse.error);
    }

    return jsonResponse;
};
