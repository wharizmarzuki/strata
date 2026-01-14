import type { ReactNode } from 'react';

import styles from '../app/page.module.css';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ title, open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close modal">
            x
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}
