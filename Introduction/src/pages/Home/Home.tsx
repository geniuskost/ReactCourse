import './Home.css';
import Counter from '../../widgets/counter/Counter';

export default function Home() {
    return (
        <div className="container py-4">
            <h1>Лічильник</h1>
            <p>Компонент Counter із перемикачем «не телефонувати»</p>
            <Counter initialQuantity={1} />
        </div>
    );
}
