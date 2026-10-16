import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { logIn } from '../../../store/authSlice';
import Social from './Social';

import './Authen.scss';

const Authen = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, isProcessing } = useSelector((state) => state.auth);
    const [isSignIn, setIsSignIn] = useState(true);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    if (isAuthenticated) {
        return <Navigate to={location.state?.from ?? '/'} replace />;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(logIn(credentials));
    };

    const toggleForm = () => setIsSignIn((value) => !value);

    return (
        <div className="authen">
            <div className={`container ${isSignIn ? '' : 'right-panel-active'}`} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <Social />
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name..." name="name" />
                        <input type="email" placeholder="Email..." />
                        <input type="password" name="password" placeholder="Password..." />
                        <button>Sign up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleFormSubmit}>
                        <h1>Sign in</h1>
                        <Social />
                        <span>or use your email for registration</span>
                        <input
                            type="email"
                            placeholder="Email..."
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password..."
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                        <a href="/">Forgot your password ?</a>
                        {isProcessing ? (
                            <button type="button" disabled>
                                <div className="loading">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </button>
                        ) : (
                            <button type="submit">Sign in</button>
                        )}
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome back !</h1>
                            <p>To keep connected with us please login with your pesonal info</p>
                            <button className="ghost" id="signIn" onClick={toggleForm}>
                                Sign in
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend !</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={toggleForm}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authen;
