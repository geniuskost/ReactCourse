import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container text-center py-5">
            <h1 className="display-1">404</h1>
            <p>Сторінку не знайдено.</p>
            <Link to="/" className="btn btn-outline-success">На головну</Link>
        </div>
    );
}
