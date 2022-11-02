class Auth {
    constructor(data) {
        this.host = data.host;
    }

    //пробросить данные для регистрации через АПИ
    register(data) {
        return fetch(`${this.host}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email,
            })
        }).then((response) => response.json())
    };

    //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
    login(dataUser) {
        return fetch(`${this.host}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: dataUser.password,
                email: dataUser.email,
            })
        }).then((response) => { return response.json() })
    };

    //запрос на сервер для авторизации
    getToken(tkn) {
        return fetch(`${this.host}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tkn}`,
            }
        }).then(res => res.json())
    }

}

const auth = new Auth({
    host: 'https://auth.nomoreparties.co',
});

export default auth;