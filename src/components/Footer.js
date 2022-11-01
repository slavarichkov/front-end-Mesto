import React from 'react';

function Footer({loggedIn}) {
    return (
        <footer className={loggedIn ? "footer" : "footer_unlogged"}>
            <p className="footer__copyright">&copy; {(new Date).getFullYear()} Mesto Russia</p>
        </footer>
    )
}

export default Footer;