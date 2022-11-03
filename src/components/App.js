import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import currentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Spinner from './Spinner';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlace] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegisterPopupOpened, setIsRegisterPopupOpened] = useState(false);
  const [isAuthUnsuccessfull, setIsAuthUserUnsuccessfull] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);
  const [textErrorRegister, setTextErrorRegister] = useState('');
  const popupClosedState = [  // необходимо для использования в useEffect и закрытия попапов
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isDeletePlacePopupOpen,
    isEditProfilePopupOpen,
    isImagePopupOpened,
    isRegisterPopupOpened,
    isAuthUnsuccessfull
  ];

  //...Работа с Апи(получение и редактирование инф на сервере: данные пользователя, карточки)...

  //пробросить данные из EditProfilePopup наверх для Апи и обновления стейта currentUser
  function handleUpdateUser(data) {
    setLoading(true);
    api.sendUserInfo(data)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        setIsEditProfilePopupOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  //пробросить данные для обновления аватара и отправки на сервер
  function handleUpdateAvatar(data) {
    setLoading(true);
    api.sendAvatar(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        setIsEditAvatarPopupOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
  }

  // запрос данных пользователя и карточек с сервера
  useEffect(() => {
    setLoading(true);
    api.getUserInfo()
      .then((infoUser) => {
        setCurrentUser(infoUser);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
  }, [])

  // запрос данных пользователя и карточек с сервера
  useEffect(() => {
    setLoading(true);
    api.getImages()
      .then((initialCards) => {
        setCards(initialCards);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
  }, []);

  //...Работа с попапами...

  // функции открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick() {
    setIsDeletePlace(true);
  }

  function handleCardClick(dataCard) {
    setIsImagePopupOpened(true);
    setSelectedCard(dataCard); //пробросить данные открытой карточки из Card для добавления в попап масштабируемого изображения
  }

  // функция закрытия попапов
  function closeAllPopups(e) {
    e.preventDefault();
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlace(false);
    setIsImagePopupOpened(false);
    setIsRegisterPopupOpened(false);
    setIsAuthUserUnsuccessfull(false)
  }

  //закрыть на Esc
  function handleCloseAllPopupsEcs(e) {
    if (e.key === "Escape") {
      closeAllPopups(e);
    }
  }

  //закрыть на оверлей
  function handleCloseAllPopupsClickOverlay(e) {
    if (e.target.classList.contains('popup_overlay')) {
      closeAllPopups(e);
    }
  }

  //Слушатели на закрытие попапов по Esc или клику на оверлей
  useEffect(() => {
    if (
      popupClosedState.includes(true)
    ) {
      document.addEventListener('click', handleCloseAllPopupsClickOverlay);
      document.addEventListener('keydown', handleCloseAllPopupsEcs);
      return () => {
        document.removeEventListener('click', handleCloseAllPopupsClickOverlay);
        document.removeEventListener('keydown', handleCloseAllPopupsEcs);
      }
    }
  }, popupClosedState);

  // ...Работа с карточками...

  // управлять лайком
  function handleCardLike(cardId, likes) {
    const isLiked = likes.some(i => i._id === currentUser._id); // проверяем, есть ли уже лайк на этой карточке
    //Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      setLoading(true);
      api.addLike(cardId)
        .then((newCard) => {
          setLoading(false);
          setCards((cards) => cards.map((c) => c._id === cardId ? newCard : c))
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        }) // данные карточки с лайком - стейт всех карточек -  мапом найти карточку с таким же айди, если нет, то новый стейт, если нет - не менять
    } else {
      setLoading(true);
      api.deleteLike(cardId)
        .then((newCard) => {
          setLoading(false);
          setCards((cards) => cards.map((c) => c._id === cardId ? newCard : c))
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
    }
  }

  //удаление карточки
  function handleCardDelete(cardId) {
    setLoading(true);
    api.deleteCard(cardId)
      .then((newCard) => {
        setLoading(false);
        setCards((cards) => cards.filter((c) => c._id !== cardId))
          .catch((err) => {
            console.log(err);
          })
      })
  }

  //отправка карточки на сервер и обновление стейта для отрисовки 
  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api.sendImages(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }

  //...Регистрация и Авторизация...

  //пробросить данные для регистрации через АПИ
  function handleRegister(data) {
    auth.register(data)
      .then((data) => {

        //записать в переменную ошибку -> вывести в инф.окно
        let messageError = data.message;
        if (Object.keys(data).includes('message')) { messageError = data.message }
        else if (Object.keys(data).includes('error')) { messageError = data.error }
        //проверить ответ сервера на содержание, есть ли ошибки
        if (Object.keys(data).includes('message') || Object.keys(data).includes('error')) {
          setTextErrorRegister(messageError); // передать текст ошибки в инф.окно
          setIsAuthUserUnsuccessfull(true)
        } else {
          setIsRegisterPopupOpened(true); // при положительном ответе открыть попап подверждения регистрации
          setTimeout(() => { // закрыть подверждение через 3 сек.
            setIsRegisterPopupOpened(false);
            setRegisterIn(false);
          }, 3000);
          setRegisterIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //пробросить данные из инпутов и отправить на сервер для авторизации пользователя
  function handleLogin(dataUser) {
    auth.login(dataUser)
      .then((data) => {
        if (data.message === 'Incorrect email address or password') {
          setIsAuthUserUnsuccessfull(true);
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem("email", dataUser.email);
          getAuth(data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //запрос на сервер для авторизации
  function getAuth(tkn) {
    auth.getToken(tkn)
      .then(() => {
        setLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
        setIsAuthUserUnsuccessfull(false);
      });
  }

  //валидация токена
  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt !== null) {
      setLoggedIn(true);
      getAuth(jwt);
    } else {
      setLoggedIn(false);
    }
  }


  //проверка авторизации пользователя
  useEffect(() => {
    tokenCheck(localStorage.getItem('token'));
  }, [loggedIn])

  // выйти из аккаунта (пробрасывается из Header) 
  function handleLogginOut(data) {
    setLoggedIn(data);
    localStorage.clear();
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleLoggedInStateChanged={handleLogginOut} />
        <Switch>
          {/* Авторизация пользователя */}
          <Route path="/sign-in">
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
          </Route>
          {/* Регистрация нового пользователя */}
          <Route path="/sign-up">
            {registerIn ? <Redirect to="/sign-in" /> : <Register onRegister={handleRegister} />}
          </Route>
          <Route exact path="/">
            {loading ? <Spinner /> : <></>}
            {loggedIn ?
              <Main onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer loggedIn={loggedIn} />
        {/* Информационное окно об успешной регистрации */}
        <InfoTooltip isRegister={isRegisterPopupOpened} isClose={closeAllPopups} isAuth={isAuthUnsuccessfull} textError={textErrorRegister} />
        {/**  <!--Попап Редактирование профиля --> */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        {/** <!--Попап добавление изображений(карточек) пользователем --> */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        {/** <!--Попап форма редактирования аватара --> */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/** <!-- Попап подтверждения удаления карточки --> */}
        <PopupWithForm name='popup_card_remove'
          text='Вы уверены?'
          isOpen={isDeletePlacePopupOpen}
          isClose={closeAllPopups} />
        {/** <!--Попап Масштабированное изображение --> */}
        < ImagePopup isOpen={isImagePopupOpened}
          name={selectedCard.name}
          link={selectedCard.src}
          onClose={closeAllPopups} />
      </div>
    </currentUserContext.Provider >
  );
}

export default App;
