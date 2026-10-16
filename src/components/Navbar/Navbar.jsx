import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { asset } from '../../config';
import { logOut } from '../../store/authSlice';
import NavLinkCustom from './NavLinkCustom';

import './Navbar.scss';

const NAV_LINKS = [
    { label: 'HOME', to: '/', end: true },
    { label: 'CHARTS', to: '/charts' },
    { label: 'ALBUMS', to: '/albums' },
    { label: 'ARTISTS', to: '/artists' },
];

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // On mobile, menu items slide in one after another while the menu is open.
    const slideIn = (index) =>
        isMenuOpen
            ? { animation: `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s` }
            : undefined;

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <h4>Persie Hoang</h4>
                </Link>
            </div>
            <div className="search">
                <i className="ion-search"></i>
                <input className="search-input" type="text" placeholder="Search for songs" />
            </div>
            <nav>
                <ul className={`nav-links ${isMenuOpen ? 'nav-fade' : ''}`}>
                    {NAV_LINKS.map((link, index) => (
                        <NavLinkCustom
                            key={link.to}
                            to={link.to}
                            label={link.label}
                            end={link.end}
                            style={slideIn(index)}
                        />
                    ))}
                    {isAuthenticated ? (
                        <NavLinkCustom
                            label={user.email}
                            to="/mymusic"
                            style={slideIn(NAV_LINKS.length)}
                        />
                    ) : (
                        <NavLinkCustom
                            label="Log in"
                            to="/login"
                            srcImg="svg/login.svg"
                            style={slideIn(NAV_LINKS.length)}
                        />
                    )}
                    {isAuthenticated && (
                        <li style={slideIn(NAV_LINKS.length + 1)}>
                            <Link to="/" onClick={() => dispatch(logOut())} aria-label="Log out">
                                <img src={asset('svg/sign-out-option.svg')} alt="" />
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div
                className={`burger ${isMenuOpen ? 'burger-toggle' : ''}`}
                onClick={() => setIsMenuOpen((open) => !open)}
            >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </header>
    );
};

export default Navbar;
