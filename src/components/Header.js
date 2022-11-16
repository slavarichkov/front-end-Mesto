import { React } from 'react';
import { Link } from 'react-router-dom';
import logo from './../images/LogoMesto.svg';
import { Route, Switch } from 'react-router-dom';

function Header({ handleLoggedInStateChanged }) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"></img>
            <Switch>
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
            </Switch>
        </header >
    )
}

export default Header;