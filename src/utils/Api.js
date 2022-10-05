class Api {
    constructor(data) {
        this.host = data.host;
        this.token = data.token;
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

    // запрос данных пользователя
    getUserInfo() {
        return fetch(`${this.host}users/me`, {
            headers: {
                authorization: this.token,
            },
        }).then((res) => this._getResponse(res))
    }

    // отправка данных пользователя
    sendUserInfo(data) {
        return fetch(`${this.host}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.name, about: data.about }),
        }).then((res) => this._getResponse(res));
    }

    //запрос изображений с сервера 
    getImages() {
        return fetch(`${this.host}cards`, {
            headers: {
                authorization: this.token,
            },
        }).then((res) => this._getResponse(res));
    }

    // отправка изображений на сервер 
    sendImages(data) {
        return fetch(`${this.host}cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.image_title, link: data.link }),
        }).then((res) => this._getResponse(res));
    }

    //смена аватара(отправка на сервер)
    sendAvatar(data) {
        return fetch(`${this.host}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: data.avatar }),
        }).then((res) => this._getResponse(res));
    }

    //удалить карточку
    deleteCard(data) {
        return fetch(`${this.host}cards/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        }).then((res) => this._getResponse(res));
    }

    //поставить лайк 
    addLike(data) {
        return fetch(`${this.host}cards/${data}/likes `, {
            method: 'PUT',
            headers: {
                authorization: this.token,
            }
        }).then((res) => this._getResponse(res));
    }

    //удалить лайк
    deleteLike(data) {
        return fetch(`${this.host}cards/${data}/likes `, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            }
        }).then((res) => this._getResponse(res));
    }
}

const api = new Api({
    host: 'https://mesto.nomoreparties.co/v1/cohort-47/',
    token: 'aa25b93c-b1f5-4136-8d21-3d760fe1b048'
});

export default api;