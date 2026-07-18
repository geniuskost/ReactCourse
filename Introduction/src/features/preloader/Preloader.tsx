import './ui/Preloader.css';

export default function Preloader() {
    return (
        <div className="preloader-bg">
            <div className="spinner-border text-primary preloader-spinner" role="status">
                <span className="visually-hidden">Завантаження...</span>
            </div>
        </div>
    );
}
