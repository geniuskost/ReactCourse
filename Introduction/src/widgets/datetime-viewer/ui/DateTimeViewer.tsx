import React, { useState } from 'react';
import { useCurrentDate } from '../../../shared/lib/hooks/useCurrentDate';
import { formatHumanReadable, getDateTimeComponents } from '../../../shared/lib/format/dateTimeFormatter';
import { Table, type TableItem } from '../../../shared/ui/table/Table';
import styles from './DateTimeViewer.module.css';

export const DateTimeViewer: React.FC = () => {
  const date = useCurrentDate();
  const [copied, setCopied] = useState(false);

  const humanReadable = formatHumanReadable(date);
  const components = getDateTimeComponents(date);

  const tableItems: TableItem[] = [
    { label: 'рік', value: components.year, highlighted: true },
    { label: 'міс', value: components.month },
    { label: 'день', value: components.day },
    { label: 'год', value: components.hour, highlighted: true },
    { label: 'хв', value: components.minute, highlighted: true },
    { label: 'сек', value: components.second },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(humanReadable);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Extract date and time parts from human-readable for separate styling
  // Expected: "15 червня 2026 р. 23:16:13"
  const datePart = humanReadable.substring(0, humanReadable.indexOf(' р.') + 3);
  const timePart = humanReadable.substring(humanReadable.indexOf(' р.') + 3).trim();

  return (
    <div className={styles.clockContainer}>
      <div className={styles.timeDisplay}>{timePart}</div>
      <div className={styles.dateDisplay}>{datePart}</div>
      <Table items={tableItems} />
      <button type="button" onClick={handleCopy}>
        {copied ? 'Скопійовано!' : 'Копіювати'}
      </button>
    </div>
  );
};
