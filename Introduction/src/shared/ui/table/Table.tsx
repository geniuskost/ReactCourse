import React from 'react';
import styles from './Table.module.css';

export interface TableItem {
  label: string;
  value: string | number;
  unit?: string;
  highlighted?: boolean;
}

interface TableProps {
  items: TableItem[];
  caption?: string;
}

export const Table: React.FC<TableProps> = ({ items, caption }) => {
  return (
    <div className={styles.container}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {items.map((item, index) => (
                <th key={`head-${index}`} className={styles.th}>
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {items.map((item, index) => (
                <td 
                  key={`val-${index}`} 
                  className={`${styles.td} ${item.highlighted ? styles.highlighted : ''}`}
                >
                  <span className={styles.value}>{item.value}</span>
                  {item.unit && <span className={styles.unit}> {item.unit}</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
