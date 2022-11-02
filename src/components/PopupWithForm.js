import React from 'react';

function PopupWithForm({
    name,
    isOpen,
    isClose,
    text,
    children,
    onSubmit,
    validationOptions,
    nameForm,
    buttonCloseDisable,
    titleColorControl,
    buttonVisibleControl,
    textButtonSubmit,
    colorButtonSubmit,
    buttonUnderText
}) {

    return (

        < div className={`popup ${name} popup_overlay ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__content">
                <button className={`popup__close-button ${buttonVisibleControl}`} type="button" onClick={isClose} disabled={buttonCloseDisable} />
                <form className={`popup__form ${nameForm}`} name={`${name}`} onSubmit={onSubmit}>
                    <h2 className={`popup__title ${titleColorControl}`}>{text}</h2>
                    <div className="popup__set">
                        {children}
                    </div>
                    <button className={`popup__button ${colorButtonSubmit}`} type="submit" disabled={validationOptions}>{textButtonSubmit}</button>
                    {buttonUnderText}
                </form>
            </div>
        </div >
    )
}

export default PopupWithForm;