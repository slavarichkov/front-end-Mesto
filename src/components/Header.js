import { React, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from './../images/LogoMesto.svg';
// управлять отрисовкой страницы в зависимости от пути в строке - dataLink
function CurrentLink({ dataLink, handleLoggedIn }) {
    if (dataLink === "/sign-up") {
        return (
            <div className="header__text-container">
                <Link className="button-text" to="/sign-in">Войти</Link>
            </div>
        )
    } else if (dataLink === "/sign-in") {
        return (
            <div className="header__text-container">
                <Link className="button-text" to="/sign-up">Регистрация</Link>
            </div>
        )
    } else {
        return (
            <div className="header__text-container">
                <h2 className="button-text_out">{localStorage.getItem('email')}</h2>
                <button className="button-text_out" onClick={() => handleLoggedIn(false)}>Выйти</button>
            </div>
        )
    }
}

function Header({ handleLoggedInStateChanged }) {
    const history = useHistory();
    const [currentRout, setCurrentRout] = useState(window.location.pathname);
    //console.log(handleLoggedInStateChanged)
    useEffect(() => {
        return history.listen((location) => {
            setCurrentRout(location.pathname);
        })
    }, [history])

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"></img>
            <CurrentLink dataLink={currentRout} handleLoggedIn={handleLoggedInStateChanged} />
        </header >
    )
}

export default Header;