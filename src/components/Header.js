import React from 'react';
import logo from './../images/LogoMesto.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"></img>
        </header>
    )
}

export default Header;