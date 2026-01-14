import type { ButtonHTMLAttributes } from 'react';

import styles from '../app/page.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function PrimaryButton({ label, className = '', ...props }: Props) {
  return (
    <button type="button" className={`${styles.primaryButton} ${className}`} {...props}>
      {label}
    </button>
  );
}
