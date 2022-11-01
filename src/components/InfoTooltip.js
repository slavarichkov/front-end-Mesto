import React from 'react';
import PopupWithForm from './PopupWithForm';
import Successfully from './../images/Union successfully.svg'
import Unsuccessfully from './../images/Union unsuccessful.svg'

function InfoTooltip({ isRegister, isClose, isAuth }) {

    function message(url, title) {
        return (
            <>
                <img className='popup__img-info-tooltip' src={url} />
                <h2 className='popup__text-info-tooltip'>{title}</h2>
            </>
        )
    }

    function showMessage() {
        if (isRegister) {
            return message(Successfully, 'Вы успешно зарегистрировались! Перейдите на вкладку Войти')
        } else if (isAuth) {
            return message(Unsuccessfully, 'Что-то пошло не так! Попробуйте ещё раз.')
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