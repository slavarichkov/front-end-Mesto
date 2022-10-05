import React from 'react';
import currentUserContext from '../contexts/CurrentUserContext';


function Card({ id, src, name, onImageClick, likes, onCardLike, onCardDelete, ownerId }) {

    const userInfo = React.useContext(currentUserContext);
    const isOwn = ownerId === userInfo._id; //проверка для кнопки удаления
    const isLiked = likes.some(item => userInfo._id === item._id); // проверка для отображения лайка

    function handleImageClick() {
        onImageClick({ src: src, name: name }); // прокинуть параметры для масштабируемого изображения
    }

    //лайк
    function handleLikeClick() {
        onCardLike(id, likes)
    }

    //удалить карточку
    function handleDeleteClick() {
        onCardDelete(id)
    }

    return (
        <div className="work-piece">
            <div className="element" id={id}>
                <img className="element__maskgroup" src={src} alt={name} onClick={handleImageClick} />
                <div className="element__group">
                    <h2 className="element__title">{name}</h2>
                    <div>
                        <button // кнопка лайка
                            className={`element__like ${isLiked ? 'element__like_activeted' : ''}`}
                            type="button"
                            onClick={handleLikeClick}>
                        </button>
                        <h2 className="element__like-sum">{likes.length}</h2>
                    </div>
                    {isOwn ?
                        <button className="element__button-delete" onClick={handleDeleteClick}></button> //кнопка удаления карточки
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}
export default Card;
