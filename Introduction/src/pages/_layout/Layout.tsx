import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ui/Layout.css';
import AppContext from '../../features/_context/AppContext';

export default function Layout() {
    const { cart } = useContext(AppContext);

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-body-tertiary border-bottom">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Крамниця</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link"><i className="bi bi-house"></i></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link cart-nav">
                                    <span>{cart.cartItems.length}</span>
                                    <i className="bi bi-cart"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/privacy" className="nav-link">Політика конфіденційності</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Пошук" aria-label="Пошук" />
                            <button className="btn btn-outline-success" type="button">Пошук</button>
                        </form>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="border-top bg-body-tertiary">
                &copy; IT STEP, 2026
            </footer>
        </>
    );
}
