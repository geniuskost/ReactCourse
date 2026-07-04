import { useId, useState } from 'react';

/**
 * Перемикач (switch) на базі checkbox — Bootstrap form-switch.
 * Д.З.: додати до Counter новий компонент з текстом "не телефонувати".
 */
export default function DoNotCallSwitch({
    checked,
    onChange,
}: {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}) {
    const id = useId();
    const [internal, setInternal] = useState<boolean>(checked ?? false);
    const isControlled = checked !== undefined;
    const value = isControlled ? checked : internal;

    const toggle = () => {
        const next = !value;
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={id}
                checked={value}
                onChange={toggle}
            />
            <label className="form-check-label" htmlFor={id}>не телефонувати</label>
        </div>
    );
}
