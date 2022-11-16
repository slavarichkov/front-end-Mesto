import { React } from 'react';
import { Link } from 'react-router-dom';
import logo from './../images/LogoMesto.svg';
import { Route } from 'react-router-dom';
// управлять отрисовкой страницы в зависимости от пути в строке - dataLink

function Header({ handleLoggedInStateChanged }) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"></img>
            <Route path="/sign-up">
                <div className="header__text-container">
                    <Link className="button-text" to="/sign-in">Войти</Link>
                </div>
            </Route>
            <Route path="/sign-in">
                <div className="header__text-container">
                    <Link className="button-text" to="/sign-up">Регистрация</Link>
                </div>
            </Route>
            <Route exact path="/">
                <div className="header__text-container">
                    <h2 className="button-text_out">{localStorage.getItem('email')}</h2>
                    <button className="button-text_out" onClick={() => handleLoggedInStateChanged(false)}>Выйти</button>
                </div>
            </Route>
        </header >
    )
}

export default Header;