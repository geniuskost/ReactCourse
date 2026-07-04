import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ui/GroupsWidget.css';
import type IGroup from '../../entities/group/model/IGroup';
import GroupApi from '../../entities/group/api/GroupApi';

export default function GroupsWidget() {
    const [groups, setGroups] = useState<Array<IGroup>>([]);
    const cropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        GroupApi.allGroups().then(setGroups);
    }, []);

    const scrollBy = (dir: number) => {
        const el = cropRef.current;
        if (!el) return;
        el.scrollLeft += dir * el.clientWidth;
    };

    return (
        <div className="groups-widget">
            <button
                type="button"
                className="btn btn-outline-secondary mb-4 me-1"
                onClick={() => scrollBy(-1)}
                aria-label="Прокрутити ліворуч"
            >
                <i className="bi bi-caret-left"></i>
            </button>

            <div className="groups-crop" ref={cropRef}>
                <div className="groups-container">
                    {groups.map((g) => (
                        // Д.З.: підказка при затриманні миші —
                        // "Перехід до групи" + назва + опис (з нового рядка)
                        <Link to={`/group/${g.slug}`} key={g.id} className="groups-item">
                            <img src={g.imageUrl} alt={g.name} />
                            {g.name}

                            <span className="groups-tooltip" role="tooltip">
                                <b>Перехід до групи «{g.name}»</b>
                                <span className="groups-tooltip__desc">{g.description}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="btn btn-outline-secondary mb-4 ms-1"
                onClick={() => scrollBy(1)}
                aria-label="Прокрутити праворуч"
            >
                <i className="bi bi-caret-right"></i>
            </button>
        </div>
    );
}
