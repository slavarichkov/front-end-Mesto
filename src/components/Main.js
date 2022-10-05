import React from 'react';
import Card from '../components/Card';
import currentUserContext from '../contexts/CurrentUserContext';


function Main(props) {

    const userInfo = React.useContext(currentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={userInfo.avatar} alt="Аватар"></img>
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__profile-info">
                    <div className="profile__content">
                        <h1 className="profile__firstname">{userInfo.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtext">{userInfo.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {/**  заготовка для изображения пользователя (карточки) */}
                {props.cards.map(card => {
                    return <Card
                        key={card._id}
                        ownerId ={card.owner._id}
                        id={card._id}
                        name={card.name}
                        src={card.link}
                        likes={card.likes}
                        onImageClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                })}
            </section>
        </main>
    )
}

export default Main;