import NavLink from '../../components/NavLink';
import { client } from '../../lib/sanity.client';
import { groq } from 'next-sanity';

import KutipanTable from './KutipanTable';
import type { Bill } from './types';
import homeStyles from '../page.module.css';
import styles from './page.module.css';

const billsQuery = groq`
  *[_type == "bill"] | order(houseNumber asc) {
    _id,
    houseNumber,
    status,
    tunggak,
    amount,
    balance
  }
`;

export default async function KutipanSekuritiPage() {
  const bills = await client.fetch<Bill[]>(billsQuery);

  return (
    <div className={styles.viewport}>
      <section className={styles.artboard} aria-label="Kutipan Sekuriti">
        <div className={styles.pageBackground} role="presentation" />
        <header className={homeStyles.navBar}>
          <div className={homeStyles.navLogo} aria-label="Strata logo" />
          <nav className={homeStyles.navLinks}>
            <NavLink id="navHome" href="/" label="Utama" />
            <NavLink href="/tentang-persatuan" label="Tentang Persatuan" />
            <NavLink href="/panduan-penduduk" label="Panduan Penduduk" />
            <NavLink href="/kutipan-sekuriti" label="Kutipan Sekuriti" />
            <NavLink href="/pengumuman" label="Pengumuman" />
            <NavLink href="/hubungi-kami" label="Hubungi Kami" />
          </nav>
        </header>
        <a
          className={`${styles.actionLink} ${styles.actionDownload}`}
          href="https://play.google.com/store/apps/details?id=com.redideas.jagaapp"
          target="_blank"
          rel="noreferrer"
          aria-label="Muat turun JagaApp 2.0 di Google Play"
        />
        <a
          className={`${styles.actionLink} ${styles.actionView}`}
          href="https://apps.apple.com/my/app/jagaapp-2-0/id1518198706"
          target="_blank"
          rel="noreferrer"
          aria-label="Muat turun JagaApp 2.0 di App Store"
        />
        <KutipanTable bills={bills} />
        <footer className={homeStyles.footer}>
          <div className={homeStyles.footerLogo} role="img" aria-label="Persatuan Penduduk" />
          <div className={homeStyles.footerCopy}>
            <p>
              The Strata ialah platform komuniti yang memudahkan penduduk mengakses pengumuman,
              panduan, dan urusan komuniti dengan lebih teratur.
            </p>
          </div>
          <div className={homeStyles.footerLinks}>
            <h4>Pautan Pantas</h4>
            <ul>
              <li>Pengumuman</li>
              <li>Panduan Penduduk</li>
              <li>Borang Keahlian</li>
              <li>Hubungi Kami</li>
              <li>Tentang Kami</li>
              <li>Dasar Privasi</li>
              <li>Terma & Syarat</li>
            </ul>
          </div>
          <div className={homeStyles.footerSupport}>
            <h4>Sokongan</h4>
            <p>pptsbpbangi@gmail.com</p>
            <p>Bandar Puteri Bangi</p>
          </div>
          <div className={homeStyles.footerDownload}>
            <h4>Muat Turun Applikasi JaGaAp 2.0</h4>
          <div className={homeStyles.footerBadges} role="img" aria-label="Muat turun aplikasi">
            <a
              className={homeStyles.footerBadgeLink}
              href="https://play.google.com/store/apps/details?id=com.redideas.jagaapp"
              target="_blank"
              rel="noreferrer"
              aria-label="Muat turun JagaApp 2.0 di Google Play"
            />
            <a
              className={homeStyles.footerBadgeLink}
              href="https://apps.apple.com/my/app/jagaapp-2-0/id1518198706"
              target="_blank"
              rel="noreferrer"
              aria-label="Muat turun JagaApp 2.0 di App Store"
            />
          </div>
          </div>
          <p className={homeStyles.footerCopyright}>
            © 2025 Persatuan Penduduk The Strata Bandar Puteri Bangi.
          </p>
        </footer>
      </section>
    </div>
  );
}
