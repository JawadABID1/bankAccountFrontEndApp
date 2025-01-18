import React from 'react';
import { Link } from 'react-router-dom';  // For routing links
// import { useAppSelector } from '../app/hooks';  // For accessing Redux state
// import { RootState } from '../app/store';

const Header: React.FC = () => {
    // Access the authenticated user information from Redux
    // const user = useAppSelector((state: RootState) => state.auth.user);

    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src="/assets/logo.png" alt="Logo" className="img-fluid" />
                </div>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/accounts" className="nav-link text-white">
                                Bank Accounts
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/customers" className="nav-link text-white">
                                Customers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-white">
                                Dashboard
                            </Link>
                        </li>
                        {/*{user ? (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <span className="nav-link text-white">*/}
                        {/*            Welcome, {user.name}*/}
                        {/*        </span>*/}
                        {/*    </li>*/}
                        {/*) : (*/}
                            <li className="nav-item">
                                <Link to="#" className="nav-link text-white">
                                    Login
                                </Link>
                            </li>
                        {/*)}*/}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
