import './Home.css';
import { DateTimeViewer } from '../../widgets/datetime-viewer/ui/DateTimeViewer';

export default function Home() {
    return (
        <div className="container py-4">
            <DateTimeViewer />
        </div>
    );
}
