import React from 'react';

function ImagePopup({ isOpen, onClose, link, name }) {

    return (
        <div className={`popup popup_image_scale ${isOpen ? 'popup_open' : ''} popup_overlay`}>
            <div className="popup__image-content">
                <button className="popup__close-button popup__close-button_image_scale" type="button" onClick={onClose} />
                <img className="popup__image-scale" src={link} alt={name} />
                <p className="popup__image-title">{name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;