import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import currentUserContext from '../contexts/CurrentUserContext';

//редактирование профиля
function EditProfilePopup({ isOpen, isClose, onUpdateUser }) {

    //данные юзера 
    const currentUser = useContext(currentUserContext);

    // Стейты, в которых содержятся значения инпута
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [validationMassegeName, setValidationMassegeName] = useState('');
    const [validationMassegeDescription, setValidationMassegeDescription] = useState('');

    //передать данные юзера в инпуты
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    // Обработчики изменения инпута - обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
        setValidationMassegeName(e.target.validationMessage);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
        setValidationMassegeDescription(e.target.validationMessage);
    }

    //отправка на сервер 
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        < PopupWithForm name='popup_user_input'
            text='Редактировать профиль'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit={handleSubmit}
            validationOptions={(validationMassegeName === '' & validationMassegeDescription === '') ? false : true}
            children={
                <>
                    <div className="popup__input-conainer">
                        <input type="text" placeholder="Имя" className="popup__input popup__input_field_firstname"
                            name="firstname" id="username-input" minLength="2" maxLength="40" required
                            value={name || ''} onChange={handleChangeName} />
                        <span className="popup__text-error" id="error-firstname">{validationMassegeName}</span>
                    </div>
                    <div className="popup__input-conainer">
                        <input type="text" placeholder="Профессия" className="popup__input"
                            name="profession" id="profession-input" minLength="2" maxLength="200" required
                            value={description || ''} onChange={handleChangeDescription} />
                        <span className="popup__text-error" id="error-firstname">{validationMassegeDescription}</span>
                    </div>
                </>
            }
        />
    )
}

export default EditProfilePopup;
