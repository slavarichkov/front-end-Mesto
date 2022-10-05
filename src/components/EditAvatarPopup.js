import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isClose, onUpdateAvatar }) {

    const inputRef = useRef();
    const [link, setLink] = useState('');
    const [validationMassegeLink, setValidationMassegeLink] = useState('');

    function handleChange(e) {
        setLink(e.target.value);
        setValidationMassegeLink(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    //очистить инпуты после сабмита
    useEffect(() => {
        setLink('');
        setValidationMassegeLink('Введите ссылку для изображения')
    }, [isOpen])

    return (
        <PopupWithForm name='popup_avatar_redact'
            text='Обновить аватар'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit={handleSubmit}
            validationOptions={(validationMassegeLink === '') ? false : true}
            children={
                <div className="popup__input-conainer">
                    <input value={link} ref={inputRef} type="url" placeholder="Ссылка" className="popup__input popup__input_name_image"
                        name="link" id="ava-link" onChange={handleChange} required />
                    <span className="popup__text-error" id="error-firstname">{validationMassegeLink}</span>
                </div>
            }
        />
    )
}

export default EditAvatarPopup;