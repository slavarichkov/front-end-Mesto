import React from 'react';
import PopupWithForm from './PopupWithForm';
import Successfully from './../images/Union successfully.svg'
import Unsuccessfully from './../images/Union unsuccessful.svg'
import Loading from '../images/loading_circles_small.gif'

function InfoTooltip({ isRegister, isClose, isAuth, textError }) {
    //заготовка под изображение и текст ошибки 
    function message(url, title, textErrorOn, loader) {
        return (
            <>
                <img className='popup__img-info-tooltip' src={url} />
                <h2 className='popup__text-info-tooltip'>{title}<br />{textErrorOn} </h2>
                <img className='popup__img-info-tooltip-loading' src={loader} />
            </>
        )
    }
    //отрисовать окно с сообщением

    function showMessage() {
        if (isRegister) {
            return message(Successfully, 'Вы успешно зарегистрировались! Переход на страницу авторизации', '',  Loading)
        } else if (isAuth) {
            return message(Unsuccessfully, `Что-то пошло не так! Попробуйте ещё раз.`, textError)
        }
    }

    return (
        <PopupWithForm
            isOpen={isRegister || isAuth ? true : false}
            isClose={isClose}
            isActiveButtonSubmit={isRegister}
            colorButtonSubmit={'popup__button_unvisible'} //спрятать кнопку сабмита
            titleColorControl={'popup__title_unvisible'} // спрятать заголовок формы, убрать отступы
            children={
                <>
                    <div className='popup__container-info-tooltip'>
                        {showMessage()}
                    </div>
                </>
            }
        />
    )
}


export default InfoTooltip;