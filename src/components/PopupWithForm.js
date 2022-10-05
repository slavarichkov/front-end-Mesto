import React from 'react';


function PopupWithForm({ name, isOpen, isClose, text, children, onSubmit, validationOptions }) {

    return (

        < div className={`popup ${name} popup_overlay ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__content">
                <button className="popup__close-button" type="button" onClick={isClose} />
                <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                    <h2 className="popup__title">{text}</h2>
                    <div className="popup__set">
                        <div className="popup__input-conainer">
                            {children}
                        </div>
                        <button className="popup__button" type="submit" disabled={validationOptions}>Сохранить</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default PopupWithForm;