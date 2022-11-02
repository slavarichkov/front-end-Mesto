import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function Login({ onLogin }) {
    // Стейты, в которых содержятся значения инпута
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationEmail, setValidationEmail] = useState('Введите email');
    const [validationPassword, setValidationPassword] = useState('Введите пароль');

    // Обработчики изменения инпута - обновляет стейт
    function handleChangeEmail(e) {
        setEmail(e.target.value);
        setValidationEmail(e.target.validationMessage);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        setValidationPassword(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({
            email: email,
            password: password,
        });
        setEmail('');
        setPassword('');
    }

    return (
        <PopupWithForm
            name='popup_open popup__auth'
            text='Вход'
            onSubmit={handleSubmit}
            titleColorControl='popup__title_auth'
            nameForm='popup__form_auth'
            buttonCloseDisable={true}
            buttonVisibleControl='popup__close-button_unvisibled'
            textButtonSubmit='Войти'
            colorButtonSubmit='popup__button_color'
            validationOptions= {(validationEmail === '' && validationPassword === '') ? false : true}
            children={
                <>
                    <div className="popup__input-conainer popup__input-conainer_auth">
                        <input type="email" placeholder="Email" className="popup__input popup__input_auth"
                            id="username-input" minLength="2" onChange={handleChangeEmail} required
                        />
                        <span className="popup__text-error" id="error-firstname">{validationEmail}</span>
                    </div>
                    <div className="popup__input-conainer popup__input-conainer_auth">
                        <input type="password" placeholder="Пароль" className="popup__input popup__input_auth"
                            id="username-input" minLength="2" onChange={handleChangePassword} required
                        />
                        <span className="popup__text-error" id="error-firstname">{validationPassword}</span>
                    </div>
                </>
            }

        />


    )
}

export default Login;