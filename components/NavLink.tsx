import Link from 'next/link';

import styles from '../app/page.module.css';

type Props = {
  href: string;
  label: string;
  id?: string;
};

export default function NavLink({ href, label, id }: Props) {
  return (
    <Link id={id} className={styles.navLink} href={href}>
      {label}
    </Link>
  );
}
