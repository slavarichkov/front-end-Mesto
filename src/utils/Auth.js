class Auth {
    constructor(data) {
        this.host = data.host;
    }

    // проверка статуса запроса
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(
                `ошибка: ${res.status} - ${res.statusText}`
            );
        }
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
        }).then((res) => this._getResponse(res))
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
        }).then((res) => { return res.json() })
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
        }).then((res) => this._getResponse(res))
    }

}

const auth = new Auth({
    host: 'https://auth.nomoreparties.co',
});

export default auth;