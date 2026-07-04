import { useState } from 'react';
import './ui/Counter.css';
import RoundButton from '../../features/round-button/RoundButton';
import DoNotCallSwitch from '../../features/do-not-call-switch/DoNotCallSwitch';

export default function Counter({
    initialQuantity,
    onChange,
    showDoNotCall = true,
}: {
    initialQuantity?: number;
    onChange?: (quantity: number) => void;
    showDoNotCall?: boolean;
}) {
    const [count, setCount] = useState<number>(initialQuantity ?? 0);

    const update = (next: number) => {
        setCount(next);
        onChange?.(next);
    };

    return (
        <div className="counter d-inline-flex flex-column align-items-center gap-2">
            <div>
                <RoundButton label="-" action={() => update(count - 1)} />
                <span className="app-cnt">{count}</span>
                <RoundButton label="+" action={() => update(count + 1)} />
            </div>
            {showDoNotCall && <DoNotCallSwitch />}
        </div>
    );
}
