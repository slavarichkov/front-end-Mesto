import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';


function Register({ onRegister }) {
    // Стейты, в которых содержятся значения инпута
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationEmail, setValidationEmail] = useState('Введите email');
    const [validationPassword, setValidationPassword] = useState('Введите пароль');

    // Обработчики изменения инпута - обновляет стейт
    function handleChangeEmail(e) { //почта
        setEmail(e.target.value);
        setValidationEmail(e.target.validationMessage);
    }

    function handleChangePassword(e) { //пароль
        setPassword(e.target.value);
        setValidationPassword(e.target.validationMessage);
    }

    function handleSubmit(e) { //пробросить почту и пароль
        e.preventDefault();
        onRegister({
            email: email,
            password: password,
        });
    }

    return (
        <PopupWithForm
            name='popup_open popup__auth'
            text='Регистрация'
            onSubmit={handleSubmit}
            titleColorControl='popup__title_auth'
            nameForm='popup__form_auth'
            buttonCloseDisable={true}
            buttonVisibleControl='popup__close-button_unvisibled'
            textButtonSubmit='Зарегистрироваться'
            colorButtonSubmit='popup__button_color'
            validationOptions={(validationEmail === '' && validationPassword === '') ? false : true}
            children={
                <>
                    <div className="popup__input-conainer popup__input-conainer_auth">
                        <input type="email" placeholder="Email" className="popup__input popup__input_auth"
                            id="username-input" minLength="2" required onChange={handleChangeEmail}
                        />
                        <span className="popup__text-error" id="error-firstname">{validationEmail}</span>
                    </div>
                    <div className="popup__input-conainer popup__input-conainer_auth">
                        <input type="password" placeholder="Пароль" className="popup__input popup__input_auth"
                            id="username-input" minLength="2" required onChange={handleChangePassword}
                        />
                        <span className="popup__text-error" id="error-firstname">{validationPassword}</span>
                    </div>
                </>
            }
            buttonUnderText={
                <Link className="popup__under-submit-button-text" to="/sign-in">Уже зарегистрированы? Войти</Link>
            }
        />
    )
}

export default Register;
